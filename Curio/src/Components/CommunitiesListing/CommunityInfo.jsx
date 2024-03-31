import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Zhongli from './assets/Zhongli.jpg';
function CommunityInfo(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={Zhongli} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default CommunityInfo;