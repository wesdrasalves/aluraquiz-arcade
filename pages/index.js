import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parse } from 'node-html-parser';

import { motion } from 'framer-motion';
import db from '../db.json';
import Widget from '../src/components/Widget';
import GitHubCorner from '../src/components/GitHubCorner';
import Footer from '../src/components/Footer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import QuizRepository from '../src/components/QuizRepository';
import Game from '../src/components/Game';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

const parseName = (text) => {
  let textClear = text.replace(/ +/g, '');
  textClear = textClear.replace(/\n+/g, '');
  return textClear.split('/');
};

const sortCrop = (items, count) => {
  const newArray = [];
  if (count >= items.length || count < 0 || items.length === 0) return items;

  while (count > 0) {
    const randNumber = Math.floor(Math.random() * items.length);
    newArray.push(items[randNumber]);
    items.slice(randNumber, 1);
    // eslint-disable-next-line no-param-reassign
    count -= 1;
  }

  return newArray;
};

export default function Home(props) {
  const router = useRouter();
  const [name, setName] = React.useState('');

  // eslint-disable-next-line react/prop-types
  const { external } = props;

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{db.title}</title>
      </Head>
      <Game />
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>
              {db.title}
            </h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Diz ai seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Vamos Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <p>Quizes da Galera</p>
            {/* eslint-disable-next-line react/destructuring-assignment */}
            <QuizRepository external={external} />
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/wesdrasalves" />
    </QuizBackground>
  );
}

export async function getServerSideProps() {
  // const filters = ['updated', '', 'stars', 'forks'];
  const filters = ['stars'];
  const filterSelect = filters[Math.floor(Math.random() * filters.length)];

  try {
    const external = await fetch(`https://github.com/topics/aluraquiz?o=desc&s=${filterSelect}`, { method: 'GET' })
      // eslint-disable-next-line consistent-return
      .then(async (res) => {
        if (res.ok) {
          let htmlData = null;

          await res.text().then((text) => {
            htmlData = text;
          });

          htmlData = parse(htmlData);

          const projects = [...htmlData.querySelectorAll('h1.lh-condensed')].map((x) => {
            const [user, project] = parseName(x.innerText);

            return { UserName: user.toLowerCase(), Project: project.toLowerCase() };
          });

          return { props: { external: sortCrop(projects, 5) } };
        }
      })
      .catch((ex) => {
        throw new Error(ex);
      });

    return external;
  } catch (err) {
    throw new Error(err);
  }
}
