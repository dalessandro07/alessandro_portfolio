// Lógica para la animación del cursor follower

export class CursorFollower {
  private cursorFollower: HTMLElement | null = null
  private originalLogo: HTMLElement | null = null
  private mouseX = 0
  private mouseY = 0
  private followerX = 0
  private followerY = 0
  private isMoving = false
  private animationId: number | null = null
  private isInitialized = false
  private cursorInactiveTimer: number | null = null

  constructor() {
    this.init()
  }

  private init (): void {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initCursorFollower())
    } else {
      this.initCursorFollower()
    }

    // Limpiar la animación al cambiar de página
    window.addEventListener('beforeunload', () => {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
      }
    })
  }

  private initCursorFollower (): void {
    this.cursorFollower = document.getElementById('cursor-follower')

    // Buscar el logo original en el header (tanto desktop como mobile)
    this.originalLogo = document.querySelector('header a[href="/"] img')

    if (!this.cursorFollower || !this.originalLogo) return

    // Detectar si es un dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (isTouchDevice) {
      this.cursorFollower.style.display = 'none'
      return
    }

    // Obtener la posición inicial del logo en el header
    const logoRect = this.originalLogo.getBoundingClientRect()
    const initialX = logoRect.left + logoRect.width / 2
    const initialY = logoRect.top + logoRect.height / 2

    // Posicionar el cursor follower en la posición inicial del logo
    this.followerX = initialX
    this.followerY = initialY
    this.cursorFollower.style.left = initialX + 'px'
    this.cursorFollower.style.top = initialY + 'px'

    // Animar el desplazamiento inicial después de un delay
    setTimeout(() => {
      if (this.cursorFollower && this.originalLogo) {
        this.cursorFollower.classList.add('initial-animation')
        this.cursorFollower.classList.add('active')

        // Ocultar el logo original completamente
        this.originalLogo.style.transition = 'opacity 0.8s ease'
        this.originalLogo.style.opacity = '0'

        // Inicializar la posición del mouse al centro de la pantalla
        this.mouseX = window.innerWidth / 2
        this.mouseY = window.innerHeight / 2

        this.isInitialized = true
      }
    }, 1000)

    this.setupEventListeners()
    this.startAnimation()
  }

  private setupEventListeners (): void {
    // Seguir el movimiento del mouse solo después de la inicialización
    document.addEventListener('mousemove', (e) => {
      if (!this.isInitialized) return

      this.mouseX = e.clientX
      this.mouseY = e.clientY
      this.isMoving = true

      // Reiniciar el timer de inactividad
      if (this.cursorInactiveTimer) {
        clearTimeout(this.cursorInactiveTimer)
      }
      this.cursorInactiveTimer = window.setTimeout(() => {
        this.isMoving = false
      }, 100)
    })

    // Ocultar cuando el mouse sale de la ventana
    document.addEventListener('mouseleave', () => {
      if (this.cursorFollower && this.isInitialized) {
        this.cursorFollower.style.opacity = '0.3'
      }
    })

    // Mostrar cuando el mouse entra a la ventana
    document.addEventListener('mouseenter', () => {
      if (this.cursorFollower && this.isInitialized) {
        this.cursorFollower.style.opacity = '0.9'
      }
    })

    // Restaurar el logo original cuando se hace clic en el logo seguidor
    if (this.cursorFollower) {
      this.cursorFollower.addEventListener('click', () => {
        this.resetAnimation()
      })
    }

    // Efectos especiales al hacer hover sobre elementos interactivos
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select'
    )

    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        if (this.cursorFollower && this.isInitialized) {
          this.cursorFollower.classList.add('hover-effect')
        }
      })

      element.addEventListener('mouseleave', () => {
        if (this.cursorFollower && this.isInitialized) {
          this.cursorFollower.classList.remove('hover-effect')
        }
      })
    })

    // Manejar cambios de tamaño de ventana
    window.addEventListener('resize', () => {
      if (this.originalLogo && this.cursorFollower && !this.isInitialized) {
        const logoRect = this.originalLogo.getBoundingClientRect()
        const initialX = logoRect.left + logoRect.width / 2
        const initialY = logoRect.top + logoRect.height / 2

        this.followerX = initialX
        this.followerY = initialY
        this.cursorFollower.style.left = initialX + 'px'
        this.cursorFollower.style.top = initialY + 'px'
      }
    })
  }

  private resetAnimation (): void {
    if (this.originalLogo && this.cursorFollower) {
      // Cancelar el seguimiento del cursor
      this.isInitialized = false
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
        this.animationId = null
      }

      // Obtener la posición del logo original en el header
      const logoRect = this.originalLogo.getBoundingClientRect()
      const targetX = logoRect.left + logoRect.width / 2
      const targetY = logoRect.top + logoRect.height / 2

      // Agregar clase de animación de retorno
      this.cursorFollower.classList.add('initial-animation')

      // Animar el regreso a la posición original
      this.cursorFollower.style.left = targetX + 'px'
      this.cursorFollower.style.top = targetY + 'px'

      // Después de la animación, restaurar el logo original y ocultar completamente el seguidor
      setTimeout(() => {
        if (this.originalLogo && this.cursorFollower) {
          this.originalLogo.style.opacity = '1'
          this.cursorFollower.style.opacity = '0'
          this.cursorFollower.style.display = 'none' // Ocultar completamente para no bloquear clics
          this.cursorFollower.style.pointerEvents = 'none' // Desactivar eventos de puntero
        }
      }, 1500) // Duración de la animación CSS (1.5s)
    }
  }

  private animate = (): void => {
    if (this.cursorFollower && this.isInitialized) {
      // Interpolación suave para el seguimiento
      const speed = 0.25
      this.followerX += (this.mouseX - this.followerX) * speed
      this.followerY += (this.mouseY - this.followerY) * speed

      this.cursorFollower.style.left = this.followerX + 'px'
      this.cursorFollower.style.top = this.followerY + 'px'

      // Efecto de escala suave basado en la velocidad
      const deltaX = this.mouseX - this.followerX
      const deltaY = this.mouseY - this.followerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const scale = Math.min(1 + distance * 0.005, 1.2)

      if (!this.cursorFollower.classList.contains('hover-effect')) {
        this.cursorFollower.style.transform = `translate(-50%, -50%) scale(${scale})`
      }
    }

    this.animationId = requestAnimationFrame(this.animate)
  }

  private startAnimation (): void {
    this.animate()
  }
}
