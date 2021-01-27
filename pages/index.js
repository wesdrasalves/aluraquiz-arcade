import * as $ from '../src/styles/index.css.js'
import Widget from '../src/components/Widget'
import GitHubCorner from '../src/components/GitHubCorner';
import Footer from '../src/components/Footer';
import QuizBackground from '../src/components/QuizBackground'

export default function Home() {
  return (
    <QuizBackground>
      <$.QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Arcade Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Lorem ipsum dolor sit</p>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <p>Lorem ipsum dolor sit</p>
          </Widget.Content>
        </Widget>
        <Footer/>
      </$.QuizContainer>
      <GitHubCorner projectUrl="https://github.com/wesdrasalves"/>
    </QuizBackground>
  );
}
