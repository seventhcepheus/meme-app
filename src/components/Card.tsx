import { useNavigate } from "react-router-dom"
import { Card, Button } from "react-bootstrap"

interface MemeCardProps {
  img: string
  title: string
}

const MemeCard = ({ img, title }: MemeCardProps) => {
  const navigate = useNavigate()
  
  return (
    <Card className="m-3" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate">{title}</Card.Title>
        <Button 
          variant="primary" 
          onClick={() => navigate(`/edit?url=${img}&title=${encodeURIComponent(title)}`)}
          className="mt-auto"
        >
          Edit Meme
        </Button>
      </Card.Body>
    </Card>
  )
}

export default MemeCard