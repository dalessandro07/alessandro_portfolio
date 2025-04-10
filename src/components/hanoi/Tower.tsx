import { useDroppable } from "@dnd-kit/core"
import Disk from "./Disk"

interface TowerProps {
  id: number
  discos: number[]
  totalDiscos: number
  estaSeleccionada: boolean
  onClick: () => void
}

export default function Tower ({ id, discos, totalDiscos, estaSeleccionada, onClick }: TowerProps) {
  // Configuración para hacer la torre un área donde soltar
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  })

  // Colores para la torre
  const baseColor = estaSeleccionada
    ? "bg-amber-300 dark:bg-amber-700"
    : isOver
      ? "bg-green-300 dark:bg-green-700"
      : "bg-stone-300 dark:bg-stone-700"

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col items-center justify-end cursor-pointer relative w-1/3 max-w-[200px]"
      onClick={onClick}
    >
      {/* Barra de la torre */}
      <div className={`w-4 h-72 rounded-t-md ${baseColor} mb-1`}></div>

      {/* Base de la torre */}
      <div className={`w-full h-4 rounded-md ${baseColor}`}></div>

      {/* Contenedor de discos - posicionado absolutamente para apilar discos */}
      <div className="absolute flex flex-col-reverse items-center w-full bottom-4">
        {discos.map((size, index) => (
          <div className="flex justify-center w-full"
          >
            <Disk
              size={size}
              totalDisks={totalDiscos}
              isDraggable={index === discos.length - 1}
              id={`${id}-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
