import Disk from "@/components/hanoi/Disk"
import Tower from '@/components/hanoi/Tower'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { restrictToWindowEdges } from "@dnd-kit/modifiers"
import { useEffect, useRef, useState } from "react"

// Game state types to better organize state
type GameState = {
  discos: number
  torres: number[][]
  torreSeleccionada: number | null
  movimientos: number
  juegoGanado: boolean
  movimientosOptimos: number
  tiempo: number
  juegoIniciado: boolean
}

type DragState = {
  discoArrastrado: number | null
  origenArrastre: number | null
}

export default function MainHanoi () {
  // Combined state objects for better organization
  const [game, setGame] = useState<GameState>({
    discos: 3,
    torres: [],
    torreSeleccionada: null,
    movimientos: 0,
    juegoGanado: false,
    movimientosOptimos: 0,
    tiempo: 0,
    juegoIniciado: false,
  })

  const [drag, setDrag] = useState<DragState>({
    discoArrastrado: null,
    origenArrastre: null,
  })

  const [modalAbierto, setModalAbierto] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const gameContainerRef = useRef<HTMLDivElement>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  )

  // Check if mobile view on mount and when window resizes
  useEffect(() => {
    const checkMobileView = () => {
      const mobile = window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobileView(mobile)
    }

    // Initial check
    if (typeof window !== 'undefined') {
      checkMobileView()
      window.addEventListener('resize', checkMobileView)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobileView)
      }
    }
  }, [])

  // Initialize game on disco change
  useEffect(() => {
    reiniciarJuego()
  }, [game.discos])

  // Timer management
  useEffect(() => {
    if (game.juegoIniciado && !game.juegoGanado) {
      timerRef.current = setInterval(() => {
        setGame(prev => ({ ...prev, tiempo: prev.tiempo + 1 }))
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [game.juegoIniciado, game.juegoGanado])

  // Check win condition
  useEffect(() => {
    checkWinCondition()
  }, [game.torres, game.discos])

  // Helper function to check if game is won
  const checkWinCondition = () => {
    const { torres, discos } = game
    if (torres[2]?.length === discos) {
      // Check disks are in correct order (decreasing size from bottom to top)
      const ordenCorrecto = torres[2].every((disco, index, array) =>
        index === array.length - 1 || disco > array[index + 1]
      )

      if (ordenCorrecto) {
        if (timerRef.current) clearInterval(timerRef.current)
        setGame(prev => ({ ...prev, juegoGanado: true }))
        setModalAbierto(true)
      }
    }
  }

  // Reset game state
  const reiniciarJuego = () => {
    const torresIniciales = [
      Array.from({ length: game.discos }, (_, i) => game.discos - i),
      [],
      [],
    ]

    if (timerRef.current) clearInterval(timerRef.current)

    setGame({
      ...game,
      torres: torresIniciales,
      torreSeleccionada: null,
      movimientos: 0,
      juegoGanado: false,
      movimientosOptimos: Math.pow(2, game.discos) - 1,
      tiempo: 0,
      juegoIniciado: false,
    })
  }

  // Get top disk from tower
  const obtenerDiscoSuperior = (torre: number[]) =>
    torre.length > 0 ? torre[torre.length - 1] : null

  // Handle tower click
  const manejarClicTorre = (indiceTorre: number) => {
    if (game.juegoGanado) return

    // Start game on first move
    if (!game.juegoIniciado && game.torres[indiceTorre].length > 0) {
      setGame(prev => ({ ...prev, juegoIniciado: true }))
    }

    if (game.torreSeleccionada === null) {
      // Select tower if it has disks
      if (game.torres[indiceTorre].length > 0) {
        setGame(prev => ({ ...prev, torreSeleccionada: indiceTorre }))
      }
    } else {
      // Try to move disk if different tower
      if (game.torreSeleccionada !== indiceTorre) {
        const discoSuperiorOrigen = obtenerDiscoSuperior(game.torres[game.torreSeleccionada])
        const discoSuperiorDestino = obtenerDiscoSuperior(game.torres[indiceTorre])

        // Check if move is valid
        if (discoSuperiorOrigen !== null &&
          (!discoSuperiorDestino || discoSuperiorOrigen < discoSuperiorDestino)) {
          moveDisc(game.torreSeleccionada, indiceTorre)
        }
      }

      // Deselect tower
      setGame(prev => ({ ...prev, torreSeleccionada: null }))
    }
  }

  // Move disk between towers
  const moveDisc = (fromTower: number, toTower: number) => {
    const nuevasTorres = game.torres.map(torre => [...torre])
    const disco = nuevasTorres[fromTower].pop()

    if (disco !== undefined) {
      nuevasTorres[toTower].push(disco)
      setGame(prev => ({
        ...prev,
        torres: nuevasTorres,
        movimientos: prev.movimientos + 1
      }))
    }
  }

  // Handle drag start
  const manejarInicioDrag = (event: DragStartEvent) => {
    if (game.juegoGanado) return

    if (!game.juegoIniciado) {
      setGame(prev => ({ ...prev, juegoIniciado: true }))
    }

    const { active } = event
    const [torreId] = active.id.toString().split("-")
    const indiceTorre = Number.parseInt(torreId)

    if (game.torres[indiceTorre].length > 0) {
      const discoSuperior = obtenerDiscoSuperior(game.torres[indiceTorre])
      setDrag({
        discoArrastrado: discoSuperior,
        origenArrastre: indiceTorre
      })
    }
  }

  // Handle drag end
  const manejarFinDrag = (event: DragEndEvent) => {
    const { over } = event
    const { discoArrastrado, origenArrastre } = drag

    if (over && discoArrastrado !== null && origenArrastre !== null) {
      const indiceTorreDestino = Number.parseInt(over.id.toString())
      const discoSuperiorDestino = obtenerDiscoSuperior(game.torres[indiceTorreDestino])

      // Check if move is valid
      if (indiceTorreDestino !== origenArrastre &&
        (!discoSuperiorDestino || discoArrastrado < discoSuperiorDestino)) {
        moveDisc(origenArrastre, indiceTorreDestino)
      }
    }

    // Reset drag state
    setDrag({ discoArrastrado: null, origenArrastre: null })
  }

  // Change difficulty
  const cambiarDificultad = (nuevosDiscos: number) => {
    setGame(prev => ({ ...prev, discos: nuevosDiscos }))
  }

  // Format time (mm:ss)
  const formatearTiempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60)
    const segs = segundos % 60
    return `${minutos.toString().padStart(2, "0")}:${segs.toString().padStart(2, "0")}`
  }

  // Progress to next level
  const avanzarNivel = () => {
    const nuevosDiscos = game.discos < 6 ? game.discos + 1 : game.discos

    if (game.discos < 6) {
      cambiarDificultad(nuevosDiscos)
    } else {
      reiniciarJuego()
    }

    setModalAbierto(false)
  }

  // Start game in fullscreen (for mobile)
  const startGame = async () => {
    setGameStarted(true)

    // Request fullscreen when game starts on mobile
    try {
      if (gameContainerRef.current?.requestFullscreen && isMobileView) {
        // Small delay to ensure smooth transition
        setTimeout(async () => {
          await gameContainerRef.current!.requestFullscreen()
          setIsFullscreen(true)

          // Force screen to landscape if possible
          if (screen.orientation && 'lock' in screen.orientation) {
            try {
              await (screen.orientation as any).lock('landscape')
            } catch (err) {
              console.error('Could not lock screen orientation:', err)
            }
          }
        }, 100)
      }
    } catch (err) {
      console.error('Error entering fullscreen:', err)
    }
  }

  // Exit game and fullscreen
  const exitGame = async () => {
    if (document.exitFullscreen) {
      try {
        await document.exitFullscreen()
      } catch (err) {
        console.error('Error exiting fullscreen:', err)
      }
    }
    setIsFullscreen(false)
    setGameStarted(false)
  }

  // If mobile view and game not started, show only the play button
  if (isMobileView && !gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <button
          onClick={startGame}
          className="btn btn-lg btn-primary"
        >
          Jugar
        </button>
        <p className="mt-4 text-sm text-gray-500">Se abrirá en pantalla completa para mejor experiencia.</p>
      </div>
    )
  }

  return (
    <div
      ref={gameContainerRef}
      className={`px-4 py-8 mx-auto ${isFullscreen ? 'landscape:h-screen landscape:flex landscape:flex-col landscape:justify-center' : ''}`}
    >
      <div className={`w-full shadow-xl card ${isFullscreen ? 'landscape:h-full landscape:flex landscape:flex-col' : ''}`}>
        <div className="card-body">
          {/* Difficulty buttons and controls */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <div className="flex flex-wrap gap-2">
              {[3, 4, 5, 6, 7, 8, 9, 10].map(level => {
                const difficultyName = {
                  3: "Fácil",
                  4: "Medio",
                  5: "Difícil",
                  6: "Experto",
                  7: "Maestro",
                  8: "Profesional",
                  9: "Crack",
                  10: "Imposible",
                }[level]

                return (
                  <button
                    key={level}
                    className={`btn btn-sm md:btn-md grow ${game.discos === level ? "btn-primary" : "btn-outline"}`}
                    onClick={() => cambiarDificultad(level)}
                  >
                    {difficultyName} ({level})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Game stats */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="text-sm">
              <span className="font-medium">Movimientos:</span> {game.movimientos}
            </div>
            <div className="text-sm">
              <span className="font-medium">Tiempo:</span> {formatearTiempo(game.tiempo)}
            </div>
            <div className="text-sm">
              <span className="font-medium">Óptimo:</span> {game.movimientosOptimos} movimientos
            </div>
          </div>

          {/* Game area */}
          <DndContext
            sensors={sensors}
            onDragStart={manejarInicioDrag}
            onDragEnd={manejarFinDrag}
            modifiers={[restrictToWindowEdges]}
          >
            <div className={`flex items-end justify-between mb-8 ${isFullscreen ? 'h-full min-h-32 flex-1' : 'h-80'}`}>
              {game.torres.map((torre, index) => (
                <Tower
                  key={index}
                  id={index}
                  discos={torre}
                  totalDiscos={game.discos}
                  estaSeleccionada={game.torreSeleccionada === index}
                  onClick={() => manejarClicTorre(index)}
                />
              ))}
            </div>

            <DragOverlay>
              {drag.discoArrastrado ? (
                <div className="flex justify-center">
                  <Disk size={drag.discoArrastrado} totalDisks={game.discos} />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>

          {/* Action buttons */}
          <div className="justify-center mt-4 card-actions">
            <button className="btn btn-primary" onClick={reiniciarJuego}>Reiniciar Juego</button>
            {isMobileView && (
              <button
                className="btn btn-error"
                onClick={exitGame}
              >
                Salir
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Victory modal */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box">
            <h3 className="text-lg font-bold">¡Nivel Completado!</h3>
            <p className="py-2">Has completado el nivel con {game.discos} discos.</p>

            <div className="grid grid-cols-2 gap-4 my-4">
              <div>
                <p className="font-medium">Tiempo:</p>
                <p>{formatearTiempo(game.tiempo)}</p>
              </div>
              <div>
                <p className="font-medium">Movimientos:</p>
                <p>
                  {game.movimientos} de {game.movimientosOptimos} óptimos
                </p>
              </div>
            </div>

            <div className="alert alert-success">
              <p>
                {game.movimientos === game.movimientosOptimos
                  ? "¡Perfecto! Has usado el número óptimo de movimientos."
                  : `Eficiencia: ${Math.round((game.movimientosOptimos / game.movimientos) * 100)}%`}
              </p>
            </div>

            <div className="modal-action">
              <button className="btn btn-outline" onClick={reiniciarJuego}>
                Reintentar Nivel
              </button>
              <button className="btn btn-primary" onClick={avanzarNivel}>
                {game.discos < 6 ? "Siguiente Nivel" : "Volver a Empezar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
