import { useEffect, useMemo, useState } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const TOTAL_QUESTIONS = 5
const activityVisuals = {
  espacial: 'compass',
  figuras: 'triangle',
  memoria: 'brain',
  tablas: 'multiply',
  quebrados: 'fraction',
  decimales: 'number',
}
const optionVisuals = {
  Adentro: 'box',
  Afuera: 'tree',
  Arriba: 'arrowUp',
  Abajo: 'arrowDown',
  Cerca: 'near',
  Lejos: 'far',
  Encima: 'arrowUp',
  Debajo: 'arrowDown',
  Círculo: 'circle',
  Triángulo: 'triangle',
  Cuadrado: 'square',
  Rectángulo: 'rectangle',
  gato: 'cat',
  perro: 'dog',
  conejo: 'rabbit',
  rana: 'frog',
  mono: 'monkey',
  tigre: 'tiger',
}

function Icon({ name, size = 24, className = '' }) {
  const paths = {
    cap: <><path d="M3 10 12 5l9 5-9 5-9-5Z" /><path d="M6 12v4c3 2 9 2 12 0v-4" /><path d="M21 10v5" /></>,
    teacher: <><circle cx="12" cy="8" r="3" /><path d="M5 21c.7-4 2.8-6 7-6s6.3 2 7 6M4 12h16M7 12v3M17 12v3" /></>,
    student: <><circle cx="12" cy="8" r="3" /><path d="M5 21c.7-4 2.8-6 7-6s6.3 2 7 6" /></>,
    rainbow: <><path d="M4 18a8 8 0 0 1 16 0" /><path d="M7 18a5 5 0 0 1 10 0M10 18a2 2 0 0 1 4 0" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15 9-2 4-4 2 2-4 4-2Z" /></>,
    triangle: <path d="m12 4 9 16H3L12 4Z" />,
    brain: <><path d="M9 5a3 3 0 0 0-3 3v1a3 3 0 0 0-2 3 3 3 0 0 0 2 3v1a3 3 0 0 0 3 3h1V5H9ZM15 5a3 3 0 0 1 3 3v1a3 3 0 0 1 2 3 3 3 0 0 1-2 3v1a3 3 0 0 1-3 3h-1V5h1Z" /><path d="M8 10h2M14 10h2M8 15h2M14 15h2" /></>,
    multiply: <><path d="m7 7 10 10M17 7 7 17" /><circle cx="12" cy="12" r="9" /></>,
    fraction: <><path d="M8 5h3M13 19h3M16 5 8 19" /><circle cx="7" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></>,
    number: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 9h8M8 13h8M8 17h4" /></>,
    box: <><path d="m4 8 8-4 8 4-8 4-8-4Z" /><path d="M4 8v8l8 4 8-4V8M12 12v8" /></>,
    tree: <><path d="M12 20V13" /><path d="m12 4 3 4h-2l3 4h-3l3 4H8l3-4H8l3-4H9l3-4Z" /></>,
    fish: <><path d="M4 12c3-5 9-5 14 0-5 5-11 5-14 0Z" /><path d="m18 12 3-3v6l-3-3ZM9 10h.1M9 14h.1" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></>,
    ball: <circle cx="12" cy="12" r="8" />,
    bird: <><path d="M4 15c3-7 9-9 16-6-2 5-6 8-12 7l-4 3 1-4-1-3Z" /><path d="M16 10h.1" /></>,
    arrowUp: <path d="m5 13 7-7 7 7M12 6v12" />,
    arrowDown: <path d="m5 11 7 7 7-7M12 18V6" />,
    near: <><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" /></>,
    far: <><circle cx="12" cy="12" r="2" /><path d="M5 5h3M16 5h3M5 19h3M16 19h3" /></>,
    circle: <circle cx="12" cy="12" r="8" />,
    square: <rect x="5" y="5" width="14" height="14" />,
    rectangle: <rect x="4" y="7" width="16" height="10" />,
    cat: <><path d="m5 9 1-4 4 3h4l4-3 1 4v6a7 7 0 0 1-14 0V9Z" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /></>,
    dog: <><path d="M6 9 4 6l4 1 4-2 4 2 4-1-2 3v6a6 6 0 0 1-12 0V9Z" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /></>,
    rabbit: <><path d="M9 8 8 3M15 8l1-5M6 11a6 6 0 0 0 12 0 6 6 0 0 0-12 0Z" /><circle cx="9" cy="11" r="1" /><circle cx="15" cy="11" r="1" /></>,
    frog: <><circle cx="8" cy="8" r="3" /><circle cx="16" cy="8" r="3" /><path d="M5 12a7 7 0 0 0 14 0M9 16h6" /></>,
    monkey: <><circle cx="12" cy="12" r="6" /><circle cx="5" cy="12" r="2" /><circle cx="19" cy="12" r="2" /><path d="M9 10h.1M15 10h.1M9 15c2 1 4 1 6 0" /></>,
    tiger: <><path d="M5 8 7 5l3 2h4l3-2 2 3v7a7 7 0 0 1-14 0V8Z" /><path d="M9 9v3M15 9v3M12 7v3" /></>,
    card: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
    trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM12 13v5M8 20h8" /><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    cross: <><path d="m6 6 12 12M18 6 6 18" /></>,
    volume: <><path d="M5 10h3l4-4v12l-4-4H5v-4ZM16 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12" /></>,
    play: <path d="m8 5 11 7-11 7V5Z" />,
    users: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2" /><path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6M15 15c3 0 5 2 5 5" /></>,
    gamepad: <><path d="M6 9h12a4 4 0 0 1 4 4v3a3 3 0 0 1-5 2l-2-2H9l-2 2a3 3 0 0 1-5-2v-3a4 4 0 0 1 4-4Z" /><path d="M7 12v4M5 14h4M16 14h.1M19 12h.1" /></>,
    chart: <><path d="M5 20V10M12 20V5M19 20v-8" /><path d="M3 20h18" /></>,
    logout: <><path d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9" /></>,
    sparkle: <><path d="m12 3 1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5L12 3Z" /></>,
    book: <><path d="M4 5a3 3 0 0 1 3-2h5v17H7a3 3 0 0 0-3 2V5ZM20 5a3 3 0 0 0-3-2h-5v17h5a3 3 0 0 1 3 2V5Z" /></>,
  }
  return <svg className={`icono ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.sparkle}</svg>
}

function createQuestion(category, index) {
  const spatial = [
    ['¿Dónde está el pez?', ['Adentro', 'Afuera'], 'Adentro', 'fish'],
    ['¿Dónde está el sol?', ['Arriba', 'Abajo'], 'Arriba', 'sun'],
    ['¿Dónde está la pelota?', ['Cerca', 'Lejos'], 'Cerca', 'ball'],
    ['¿Dónde está el libro?', ['Encima', 'Debajo'], 'Encima', 'book'],
    ['¿Dónde está el pájaro?', ['Adentro', 'Afuera'], 'Afuera', 'bird'],
  ]
  const shapes = [
    ['¿Cuál figura tiene 3 lados?', ['Círculo', 'Triángulo', 'Cuadrado'], 'Triángulo', 'triangle'],
    ['¿Cuál figura no tiene lados?', ['Rectángulo', 'Círculo', 'Cuadrado'], 'Círculo', 'circle'],
    ['¿Cuál figura tiene 4 lados iguales?', ['Triángulo', 'Cuadrado', 'Círculo'], 'Cuadrado', 'square'],
    ['¿Cuál figura parece una puerta?', ['Rectángulo', 'Círculo', 'Triángulo'], 'Rectángulo', 'rectangle'],
    ['¿Cuál figura tiene 3 lados?', ['Rectángulo', 'Triángulo', 'Círculo'], 'Triángulo', 'triangle'],
  ]
  const memory = [
    ['Encuentra el animal que hace pareja con perro', ['gato', 'perro', 'conejo'], 'perro', 'card'],
    ['Encuentra el animal que hace pareja con gato', ['conejo', 'gato', 'perro'], 'gato', 'card'],
    ['Encuentra el animal que hace pareja con conejo', ['perro', 'conejo', 'gato'], 'conejo', 'card'],
    ['Encuentra el animal que hace pareja con rana', ['rana', 'mono', 'tigre'], 'rana', 'card'],
    ['Encuentra el animal que hace pareja con mono', ['tigre', 'rana', 'mono'], 'mono', 'card'],
  ]
  const multiplication = [
    [2, 3], [4, 5], [6, 2], [7, 3], [9, 2],
  ]
  const fractions = [
    ['1/2 + 1/2', ['1/2', '1', '2'], '1'],
    ['1/4 + 1/4', ['1/2', '1/4', '1'], '1/2'],
    ['2/3 + 1/3', ['1/3', '2/3', '1'], '1'],
    ['1/5 + 2/5', ['3/5', '2/5', '1'], '3/5'],
    ['1/2 + 1/4', ['3/4', '1/4', '1'], '3/4'],
  ]
  const decimals = [
    ['¿Cuánto es 1.5 × 2?', ['2.5', '3', '3.5'], '3'],
    ['¿Cuánto es 2.5 × 2?', ['4', '5', '6'], '5'],
    ['¿Cuánto es 0.5 × 4?', ['1', '2', '4'], '2'],
    ['¿Cuánto es 1.2 × 3?', ['3.6', '2.6', '4.2'], '3.6'],
    ['¿Cuánto es 2.1 × 2?', ['4.2', '3.2', '2.4'], '4.2'],
  ]

  if (category === 'espacial') {
    const [prompt, options, answer, visual] = spatial[index]
    return { prompt, options, answer, visual }
  }

  if (category === 'figuras') {
    const [prompt, options, answer, visual] = shapes[index]
    return { prompt, options, answer, visual }
  }
  if (category === 'memoria') {
    const [prompt, options, answer, visual] = memory[index]
    return { prompt, options, answer, visual }
  }
  if (category === 'tablas') {
    const [first, second] = multiplication[index]
    return { prompt: `¿Cuánto es ${first} × ${second}?`, options: [String(first * second), String(first * second + 2), String(first * second - 1)], answer: String(first * second), visual: 'multiply' }
  }
  if (category === 'quebrados') {
    const [prompt, options, answer] = fractions[index]
    return { prompt, options, answer, visual: 'fraction' }
  }
  const [prompt, options, answer] = decimals[index]
  return { prompt, options, answer, visual: 'number' }
}

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('teacherToken') || '')
  const [teacher, setTeacher] = useState(() => {
    const saved = localStorage.getItem('teacher')
    return saved ? JSON.parse(saved) : null
  })
  const [entryView, setEntryView] = useState(() =>
    localStorage.getItem('teacherToken') ? 'teacher' : 'home',
  )
  const [students, setStudents] = useState([])
  const [activities, setActivities] = useState([])
  const [progress, setProgress] = useState([])
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [section, setSection] = useState('estudiantes')
  const [childMode, setChildMode] = useState(false)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [gameActivity, setGameActivity] = useState(null)
  const [gameQuestionIndex, setGameQuestionIndex] = useState(0)
  const [gameCorrect, setGameCorrect] = useState(0)
  const [gameWrong, setGameWrong] = useState(0)
  const [gameFeedback, setGameFeedback] = useState('')
  const [gameFinished, setGameFinished] = useState(false)
  const [gameSaving, setGameSaving] = useState(false)

  const selectedStudent = useMemo(
    () => students.find((student) => String(student.id) === selectedStudentId),
    [selectedStudentId, students],
  )

  async function apiFetch(path, options = {}) {
    const headers = new Headers(options.headers)
    headers.set('Authorization', `Bearer ${token}`)
    return fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  }

  async function loadTeacherData() {
    if (!token) return
    setLoading(true)
    try {
      const [studentsResponse, activitiesResponse] = await Promise.all([
        apiFetch('/api/estudiantes'),
        fetch(`${API_BASE_URL}/api/actividades`),
      ])
      if (studentsResponse.status === 401) {
        handleLogout()
        throw new Error('La sesión expiró. Inicia sesión nuevamente.')
      }
      if (!studentsResponse.ok || !activitiesResponse.ok) {
        throw new Error('No se pudieron cargar los datos del sistema')
      }
      setStudents(await studentsResponse.json())
      setActivities(await activitiesResponse.json())
    } catch (loadError) {
      setError(loadError instanceof TypeError ? 'No se pudo conectar con el backend.' : loadError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTeacherData()
  }, [token])

  async function openStudentMode() {
    setEntryView('student')
    setLoading(true)
    setError('')
    try {
      const [studentsResponse, activitiesResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/estudiantes/public`),
        fetch(`${API_BASE_URL}/api/actividades`),
      ])
      if (!studentsResponse.ok || !activitiesResponse.ok) {
        throw new Error('No se pudieron cargar los perfiles')
      }
      setStudents(await studentsResponse.json())
      setActivities(await activitiesResponse.json())
    } catch (studentError) {
      setError(studentError instanceof TypeError ? 'No se pudo conectar con el backend.' : studentError.message)
    } finally {
      setLoading(false)
    }
  }

  async function loadProgress() {
    setLoading(true)
    setError('')
    try {
      const response = await apiFetch('/api/progresos')
      if (!response.ok) throw new Error('No se pudieron cargar los reportes')
      setProgress(await response.json())
    } catch (progressError) {
      setError(progressError.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(event) {
    event.preventDefault()
    setLoginLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: username, clave: password }),
      })
      const body = await response.json().catch(() => null)
      if (!response.ok) throw new Error(body?.error || 'No se pudo iniciar sesión')
      localStorage.setItem('teacherToken', body.token)
      localStorage.setItem('teacher', JSON.stringify(body.docente))
      setToken(body.token)
      setTeacher(body.docente)
      setEntryView('teacher')
      setPassword('')
    } catch (loginError) {
      setError(loginError instanceof TypeError ? 'No se pudo conectar con el backend.' : loginError.message)
    } finally {
      setLoginLoading(false)
    }
  }

  function handleLogout() {
    localStorage.removeItem('teacherToken')
    localStorage.removeItem('teacher')
    setToken('')
    setTeacher(null)
    setEntryView('home')
    setChildMode(false)
    setStudents([])
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const parsedAge = Number(age)
    if (!name.trim()) {
      setError('Debes escribir el nombre del estudiante')
      return
    }
    if (!Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 14) {
      setError('La edad debe ser un número entero entre 1 y 14')
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await apiFetch('/api/estudiantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: name.trim(), edad: parsedAge }),
      })
      const body = await response.json().catch(() => null)
      if (!response.ok) throw new Error(body?.error || 'No se pudo registrar el estudiante')
      setStudents((current) => [...current, body])
      setSelectedStudentId(String(body.id))
      setName('')
      setAge('')
      setMessage(`Estudiante "${body.nombre}" registrado correctamente`)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setLoading(false)
    }
  }

  function openChildMode() {
    if (!selectedStudent) {
      setError('Selecciona un estudiante antes de entrar al modo niño')
      return
    }
    setError('')
    setChildMode(true)
  }

  function speak(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))
    }
  }

  function startGame(activity) {
    setGameActivity(activity)
    setGameQuestionIndex(0)
    setGameCorrect(0)
    setGameWrong(0)
    setGameFeedback('')
    setGameFinished(false)
    setMessage('')
  }

  async function saveGameProgress(activity, correct, wrong) {
    setGameSaving(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/progresos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          estudiante_id: Number(selectedStudentId),
          actividad_id: activity.id,
          puntuacion: correct * 20,
          aciertos: correct,
          errores: wrong,
        }),
      })
      if (!response.ok) throw new Error('No se pudo guardar el progreso')
    } catch (progressError) {
      setError(progressError instanceof TypeError ? 'No se pudo conectar con el backend.' : progressError.message)
    } finally {
      setGameSaving(false)
    }
  }

  function answerQuestion(option) {
    if (!gameActivity || gameFeedback || gameFinished) return
    const question = createQuestion(gameActivity.categoria, gameQuestionIndex)
    const isCorrect = option === question.answer
    const nextCorrect = gameCorrect + (isCorrect ? 1 : 0)
    const nextWrong = gameWrong + (isCorrect ? 0 : 1)
    setGameFeedback(isCorrect ? '¡Muy bien! 🎉' : `La respuesta correcta es ${question.answer}`)
    setGameCorrect(nextCorrect)
    setGameWrong(nextWrong)

    window.setTimeout(() => {
      setGameFeedback('')
      if (gameQuestionIndex + 1 >= TOTAL_QUESTIONS) {
        setGameFinished(true)
        saveGameProgress(gameActivity, nextCorrect, nextWrong)
      } else {
        setGameQuestionIndex((current) => current + 1)
      }
    }, 900)
  }

  if (entryView === 'home') {
    return (
      <main className="pantalla-inicio">
        <section className="tarjeta-inicio">
          <span className="marca"><Icon name="cap" size={34} /></span>
          <p className="subtitulo">Bienvenido a</p>
          <h1>EduJuegos</h1>
          <p className="descripcion-inicio">Aprender es una aventura. Elige cómo quieres ingresar.</p>
          <div className="rejilla-modos">
            <button type="button" className="tarjeta-modo modo-docente" onClick={() => setEntryView('teacher-login')}>
              <span><Icon name="teacher" size={38} /></span><strong>Modo docente</strong>
              <small>Administra estudiantes, actividades y reportes.</small><b>Ingresar al panel →</b>
            </button>
            <button type="button" className="tarjeta-modo modo-estudiante" onClick={openStudentMode}>
              <span><Icon name="student" size={38} /></span><strong>Modo estudiante</strong>
              <small>Elige tu perfil y empieza a jugar.</small><b>Empezar a jugar →</b>
            </button>
          </div>
          {error ? <p className="alerta error">{error}</p> : null}
        </section>
      </main>
    )
  }

  if (entryView === 'teacher-login' && !token) {
    return (
      <main className="pantalla pantalla-login">
        <section className="tarjeta tarjeta-login">
          <button type="button" className="boton-regresar" onClick={() => { setEntryView('home'); setError('') }}>← Volver</button>
          <span className="marca"><Icon name="cap" size={34} /></span>
          <h1>Sistema Educativo Infantil</h1>
          <p className="descripcion-login">Acceso para docentes y tutores</p>
          <form className="formulario" onSubmit={handleLogin}>
            <label htmlFor="username">Usuario</label>
            <input id="username" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" />
            <label htmlFor="password">Clave</label>
            <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
            <button type="submit" disabled={loginLoading}>{loginLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}</button>
          </form>
          {error ? <p className="alerta error">{error}</p> : null}
        </section>
      </main>
    )
  }

  if (entryView === 'student' && !childMode) {
    return (
      <main className="pantalla-seleccion-estudiante">
        <section className="tarjeta-seleccion-estudiante">
          <button type="button" className="boton-regresar" onClick={() => { setEntryView('home'); setError('') }}>← Volver</button>
          <span className="icono-seleccion-estudiante"><Icon name="rainbow" size={42} /></span>
          <p className="subtitulo">Modo estudiante</p>
          <h1>¿Quién va a jugar?</h1>
          <p className="descripcion-inicio">Selecciona tu nombre para comenzar.</p>
          {loading ? <p className="atenuado">Cargando perfiles...</p> : null}
          <div className="rejilla-perfiles">
            {students.map((student) => (
              <button type="button" className="tarjeta-perfil" key={student.id} onClick={() => { setSelectedStudentId(String(student.id)); setChildMode(true) }}>
                <span><Icon name="student" size={38} /></span><strong>{student.nombre}</strong><small>{student.edad} años</small>
              </button>
            ))}
          </div>
          {!loading && students.length === 0 ? <p className="estado-vacio">Todavía no hay estudiantes registrados.</p> : null}
          {error ? <p className="alerta error">{error}</p> : null}
        </section>
      </main>
    )
  }

  if (childMode) {
    if (gameActivity) {
      const question = createQuestion(gameActivity.categoria, gameQuestionIndex)
      if (gameFinished) {
        return (
          <main className={`aplicacion-infantil pantalla-juego ${['espacial', 'figuras', 'memoria'].includes(gameActivity.categoria) ? 'juego-preprimaria' : ''}`}>
            <section className="resultado-juego">
              <span className="icono-resultado"><Icon name="trophy" size={60} /></span>
              <p className="subtitulo">Actividad terminada</p>
              <h1>¡Excelente trabajo, {selectedStudent?.nombre}!</h1>
              <p>Obtuviste <strong>{gameCorrect * 20} puntos</strong></p>
              <div className="estadisticas-resultado"><span><Icon name="check" size={18} /> {gameCorrect} aciertos</span><span><Icon name="cross" size={18} /> {gameWrong} errores</span></div>
              {gameSaving ? <p className="atenuado">Guardando tu progreso...</p> : null}
              <button type="button" onClick={() => startGame(gameActivity)}>Jugar de nuevo</button>
              <button type="button" className="boton-secundario" onClick={() => setGameActivity(null)}>Elegir otra actividad</button>
            </section>
          </main>
        )
      }
      return (
        <main className={`aplicacion-infantil pantalla-juego ${['espacial', 'figuras', 'memoria'].includes(gameActivity.categoria) ? 'juego-preprimaria' : ''}`}>
          <section className="tarjeta-juego">
            <button type="button" className="boton-regresar" onClick={() => setGameActivity(null)}>← Volver a actividades</button>
            <div className="progreso-juego">Pregunta {gameQuestionIndex + 1} de {TOTAL_QUESTIONS}</div>
            <span className="visual-pregunta"><Icon name={question.visual} size={54} /></span>
            <button type="button" className="boton-escuchar" onClick={() => speak(question.prompt)}><Icon name="volume" size={18} /> Escuchar pregunta</button>
            <h1 className={['espacial', 'figuras', 'memoria'].includes(gameActivity.categoria) ? 'pregunta-visual' : ''}>{question.prompt}</h1>
            <div className="rejilla-respuestas">{question.options.map((option) => <button type="button" key={option} onClick={() => answerQuestion(option)}><span className="visual-respuesta"><Icon name={optionVisuals[option]} size={42} /></span><span className="etiqueta-respuesta">{option}</span></button>)}</div>
            {gameFeedback ? <p className={`retroalimentacion-juego ${gameFeedback.startsWith('¡') ? 'correcto' : 'incorrecto'}`}>{gameFeedback}</p> : null}
          </section>
        </main>
      )
    }
    return (
        <main className="aplicacion-infantil">
        <header className="encabezado-infantil">
          <div className="logo-infantil"><Icon name="rainbow" size={26} /> Aprende jugando</div>
          <button type="button" className="salir-infantil" onClick={() => { setChildMode(false); setEntryView(token ? 'teacher' : 'student') }}>
            {token ? 'Volver al panel' : 'Cambiar estudiante'}
          </button>
        </header>
        <section className="bienvenida-infantil"><span className="avatar-infantil"><Icon name="student" size={42} /></span><div><p>¡Hola!</p><h1>{selectedStudent?.nombre}</h1><span>Elige una aventura para aprender</span></div></section>
        <section className="actividades-infantiles">
          <h2>Mis actividades</h2>
          <div className="seccion-nivel seccion-preprimaria">
            <h3><Icon name="rainbow" size={22} /> Para aprender jugando</h3>
            <div className="rejilla-infantil">
              {activities.filter((activity) => activity.nivel === 'pre-primaria').map((activity) => <article className="actividad-infantil actividad-preprimaria" key={activity.id}><span className="icono-actividad"><Icon name={activityVisuals[activity.categoria]} size={42} /></span><h3><Icon name={activityVisuals[activity.categoria]} size={38} /></h3><p>¡Toca para jugar!</p><button type="button" onClick={() => startGame(activity)}><Icon name="play" size={18} /> Jugar</button><button type="button" className="boton-escuchar" onClick={() => speak(activity.nombre)}><Icon name="volume" size={18} /> Escuchar</button></article>)}
            </div>
          </div>
          <div className="seccion-nivel seccion-primaria">
            <h3><Icon name="book" size={22} /> Para seguir aprendiendo</h3>
            <div className="rejilla-infantil">
              {activities.filter((activity) => activity.nivel === 'primaria').map((activity) => <article className="actividad-infantil" key={activity.id}><span className="icono-actividad"><Icon name={activityVisuals[activity.categoria]} size={34} /></span><h3>{activity.nombre}</h3><p>{activity.descripcion}</p><button type="button" onClick={() => startGame(activity)}>Jugar</button></article>)}
            </div>
          </div>
        </section>
        {message ? <p className="mensaje-infantil">{message}</p> : null}
      </main>
    )
  }

  return (
    <main className="distribucion-docente">
      <aside className="barra-lateral">
        <div className="marca-barra"><span><Icon name="cap" size={22} /></span><strong>EduJuegos</strong></div>
        <div className="perfil-docente"><span><Icon name="teacher" size={25} /></span><div><strong>{teacher?.nombre_completo}</strong><small>Docente</small></div></div>
        <nav className="navegacion-lateral" aria-label="Módulos del sistema">
          <button className={section === 'estudiantes' ? 'activo' : ''} onClick={() => setSection('estudiantes')}><Icon name="users" size={20} /> <span>Estudiantes</span></button>
          <button className={section === 'actividades' ? 'activo' : ''} onClick={() => setSection('actividades')}><Icon name="gamepad" size={20} /> <span>Actividades</span></button>
          <button className={section === 'reportes' ? 'activo' : ''} onClick={() => { setSection('reportes'); loadProgress() }}><Icon name="chart" size={20} /> <span>Reportes</span></button>
        </nav>
        <div className="parte-inferior-barra"><button className="iniciar-infantil" onClick={openChildMode}><Icon name="rainbow" size={20} /> Modo niño</button><button className="cerrar-sesion" onClick={handleLogout}><Icon name="logout" size={20} /> Cerrar sesión</button></div>
      </aside>
      <section className="contenido-docente">
        <header className="encabezado-contenido"><div><p className="subtitulo">Panel docente</p><h1>{section === 'estudiantes' ? 'Estudiantes' : section === 'actividades' ? 'Actividades educativas' : 'Reportes de progreso'}</h1></div><span className="indicador-estado">● Sistema conectado</span></header>
        {section === 'estudiantes' ? <><section className="rejilla-resumen"><div className="tarjeta-resumen"><span className="icono-estadistica morado">👥</span><div><strong>{students.length}</strong><span>Estudiantes registrados</span></div></div><div className="tarjeta-resumen"><span className="icono-estadistica amarillo">🎮</span><div><strong>{activities.length}</strong><span>Actividades disponibles</span></div></div></section><section className="tarjeta-panel"><div className="titulo-panel"><div><h2>Registrar estudiante</h2><p>Agrega un nuevo perfil infantil al sistema.</p></div></div><form className="formulario-estudiante" onSubmit={handleSubmit}><div><label htmlFor="name">Nombre completo</label><input id="name" placeholder="Ejemplo: Sofía García" value={name} onChange={(event) => setName(event.target.value)} disabled={loading} maxLength={100} /></div><div><label htmlFor="age">Edad</label><input id="age" type="number" min="1" max="14" placeholder="5" value={age} onChange={(event) => setAge(event.target.value)} disabled={loading} /></div><button type="submit" disabled={loading}>{loading ? 'Guardando...' : '＋ Registrar estudiante'}</button></form></section><section className="tarjeta-panel"><div className="titulo-panel"><div><h2>Seleccionar estudiante</h2><p>Elige un perfil para iniciar una sesión de juego.</p></div><button className="boton-primario-pequeno" onClick={openChildMode}>Entrar al modo niño</button></div><select value={selectedStudentId} onChange={(event) => setSelectedStudentId(event.target.value)} disabled={loading || !students.length}><option value="">Selecciona un estudiante...</option>{students.map((student) => <option key={student.id} value={student.id}>{student.nombre} ({student.edad} años)</option>)}</select>{selectedStudent ? <p className="seleccionado">Perfil activo: <strong>{selectedStudent.nombre}</strong></p> : <p className="atenuado">Aún no has seleccionado un estudiante.</p>}</section></> : null}
        {section === 'actividades' ? <section className="tarjeta-panel"><div className="titulo-panel"><div><h2>Catálogo de actividades</h2><p>Actividades disponibles para los niveles educativos.</p></div></div><div className="actividades-docente">{activities.map((activity) => <article key={activity.id}><span className="icono-actividad"><Icon name={activityVisuals[activity.categoria]} size={28} /></span><div><h3>{activity.nombre}</h3><p>{activity.descripcion}</p><small>{activity.nivel} · {activity.categoria}</small></div></article>)}</div></section> : null}
        {section === 'reportes' ? <section className="tarjeta-panel"><div className="titulo-panel"><div><h2>Historial de progreso</h2><p>Consulta el rendimiento registrado de cada estudiante.</p></div></div>{progress.length ? <div className="envoltura-tabla"><table><thead><tr><th>Estudiante</th><th>Actividad</th><th>Puntuación</th><th>Aciertos</th><th>Errores</th></tr></thead><tbody>{progress.map((item) => <tr key={item.id}><td>{item.estudiante}</td><td>{item.actividad}</td><td>{item.puntuacion}</td><td>{item.aciertos}</td><td>{item.errores}</td></tr>)}</tbody></table></div> : <p className="estado-vacio">Todavía no hay partidas registradas.</p>}</section> : null}
        {error ? <p className="alerta error">{error}</p> : null}{message ? <p className="alerta exito">{message}</p> : null}
      </section>
    </main>
  )
}

export default App
