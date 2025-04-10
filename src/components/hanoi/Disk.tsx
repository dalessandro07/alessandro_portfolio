import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

interface DiskProps {
  size: number
  totalDisks: number
  isDraggable?: boolean
  id?: string
}

export default function Disk ({ size, totalDisks, isDraggable = false, id }: DiskProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id || `disk-${size}`,
    disabled: !isDraggable,
  })

  const style = transform
    ? {
      transform: CSS.Translate.toString(transform),
      zIndex: 1000,
      opacity: isDragging ? 0.8 : 1,
    }
    : undefined

  // Calcular porcentaje de ancho basado en el tamaño del disco
  const widthPercentage = 40 + (size * 60) / totalDisks

  // Generar un color basado en el tamaño del disco
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-teal-500",
    "bg-purple-500",
    "bg-pink-500",
  ]

  const colorIndex = (size - 1) % colors.length
  const diskColor = colors[colorIndex]

  const cursorClass = isDraggable ? "cursor-grab active:cursor-grabbing" : ""

  return (
    <div
      ref={isDraggable ? setNodeRef : undefined}
      {...(isDraggable ? { ...attributes, ...listeners } : {})}
      className={`h-6 rounded-md ${diskColor} flex items-center justify-center mb-1 ${cursorClass}`}
      style={{
        width: `${widthPercentage}%`,
        ...style,
      }}
    >
      <span className="text-xs font-bold text-white">{size}</span>
    </div>
  )
}
