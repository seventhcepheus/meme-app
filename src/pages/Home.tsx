import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Spinner, Container, Row, Col } from 'react-bootstrap'
import { getAllMemes } from '../api/memes'
import { Meme } from '../types'

export default function Home() {
  const navigate = useNavigate()
  const [memes, setMemes] = useState<Meme[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllMemes().then(data => {
      setMemes(data)
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div className="text-center mt-5">
      <Spinner animation="border" />
    </div>
  )

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Popular Meme Templates</h1>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {memes.map(meme => (
          <Col key={meme.id}>
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src={meme.url} 
                style={{ height: '200px', objectFit: 'cover' }}
                onClick={() => navigate(`/edit?url=${meme.url}&name=${encodeURIComponent(meme.name)}`)}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{meme.name}</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/edit?url=${meme.url}&name=${encodeURIComponent(meme.name)}`)}
                  className="mt-auto"
                >
                  Create Meme
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}