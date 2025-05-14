import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

interface DraggableTextProps {
  id: number;
  initialText: string;
  fontSize: number;
  color: string;
  onUpdate: (id: number, newContent: string) => void;
  onRemove: (id: number) => void;
}

const DraggableText = ({ 
  id, 
  initialText, 
  fontSize, 
  color, 
  onUpdate, 
  onRemove 
}: DraggableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing) return;
    
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate(id, text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onUpdate(id, text);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : isEditing ? "text" : "grab",
        zIndex: 1000,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        padding: "5px",
        borderRadius: "5px",
      }}
      onMouseDown={handleMouseDown}
    >
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            fontSize: `${fontSize}px`,
            color: color,
            border: "none",
            background: "transparent",
            outline: "none",
          }}
        />
      ) : (
        <div
          onDoubleClick={handleDoubleClick}
          style={{
            fontSize: `${fontSize}px`,
            color: color,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            position: "relative",
            paddingRight: "25px",
          }}
        >
          {text}
          <Button
            variant="danger"
            size="sm"
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              padding: "0 4px",
            }}
            onClick={() => onRemove(id)}
          >
            <FaTimes />
          </Button>
        </div>
      )}
    </div>
  );
};

export default DraggableText;