import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'
import { toPng } from 'html-to-image'
import { MemeText } from '../types'

export default function Edit() {
  const location = useLocation()
  const navigate = useNavigate()
  const memeRef = useRef<HTMLDivElement>(null)
  const [texts, setTexts] = useState<MemeText[]>([
    { id: '1', content: 'Top Text', x: 50, y: 10, fontSize: 32, color: '#ffffff' },
    { id: '2', content: 'Bottom Text', x: 50, y: 90, fontSize: 32, color: '#ffffff' }
  ])

  const params = new URLSearchParams(location.search)
  const imageUrl = params.get('url') || ''
  const memeName = params.get('name') || 'Meme'

  const addText = () => {
    setTexts([...texts, {
      id: Date.now().toString(),
      content: 'New Text',
      x: 50,
      y: 50,
      fontSize: 24,
      color: '#ffffff'
    }])
  }

  const updateText = (id: string, field: keyof MemeText, value: string | number) => {
    setTexts(texts.map(text => 
      text.id === id ? { ...text, [field]: value } : text
    ))
  }

  const saveMeme = async () => {
    if (memeRef.current) {
      try {
        const dataUrl = await toPng(memeRef.current)
        const link = document.createElement('a')
        link.download = `meme-${Date.now()}.png`
        link.href = dataUrl
        link.click()
      } catch (error) {
        console.error('Error saving meme:', error)
      }
    }
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Edit: {decodeURIComponent(memeName)}</h1>
      
      <Row>
        <Col lg={8}>
          <div 
            ref={memeRef} 
            className="position-relative mb-4 border rounded overflow-hidden"
            style={{ maxWidth: '600px' }}
          >
            <img src={imageUrl} alt="Meme template" style={{ width: '100%', display: 'block' }} />
            
            {texts.map(text => (
              <div
                key={text.id}
                style={{
                  position: 'absolute',
                  left: `${text.x}%`,
                  top: `${text.y}%`,
                  transform: 'translate(-50%, -50%)',
                  color: text.color,
                  fontSize: `${text.fontSize}px`,
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px #000000',
                  textAlign: 'center',
                  cursor: 'move',
                  userSelect: 'none'
                }}
              >
                {text.content}
              </div>
            ))}
          </div>
        </Col>
        
        <Col lg={4}>
          <div className="controls p-3 border rounded bg-light">
            <h4>Text Controls</h4>
            
            {texts.map(text => (
              <div key={text.id} className="mb-3 p-2 border-bottom">
                <Form.Group className="mb-2">
                  <Form.Label>Text</Form.Label>
                  <Form.Control
                    type="text"
                    value={text.content}
                    onChange={(e) => updateText(text.id, 'content', e.target.value)}
                  />
                </Form.Group>
                
                <Form.Group className="mb-2">
                  <Form.Label>Font Size: {text.fontSize}px</Form.Label>
                  <Form.Range
                    min="12"
                    max="72"
                    value={text.fontSize}
                    onChange={(e) => updateText(text.id, 'fontSize', Number(e.target.value))}
                  />
                </Form.Group>
                
                <Form.Group className="mb-2">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="color"
                    value={text.color}
                    onChange={(e) => updateText(text.id, 'color', e.target.value)}
                  />
                </Form.Group>
              </div>
            ))}
            
            <div className="d-flex gap-2">
              <Button variant="primary" onClick={addText} className="mb-3">
                Add Text
              </Button>
              
              <Button variant="success" onClick={saveMeme} className="mb-3">
                Save Meme
              </Button>
            </div>
            
            <Button variant="outline-danger" onClick={() => navigate(-1)}>
              Back to Home
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}