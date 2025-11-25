const root = document.documentElement
const toggle = () => {
  const next = root.classList.contains('dark') ? '' : 'dark'
  root.classList.toggle('dark')
  localStorage.setItem('theme', next || 'light')
}

const applyStoredTheme = () => {
  const stored = localStorage.getItem('theme')
  if (stored === 'dark') root.classList.add('dark')
}

const smoothLinks = () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1)
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })
}

const highlightNav = () => {
  const links = Array.from(document.querySelectorAll('.nav a'))
  const map = new Map(links.map(l => [l.getAttribute('href').slice(1), l]))
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.id
      const link = map.get(id)
      if (!link) return
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'))
        link.classList.add('active')
      }
    })
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 })
  document.querySelectorAll('main .section, .hero').forEach(s => io.observe(s))
}

const init = () => {
  applyStoredTheme()
  smoothLinks()
  highlightNav()

  const themeBtn = document.getElementById('theme-toggle')
  if (themeBtn) themeBtn.addEventListener('click', toggle)

  const yearEl = document.getElementById('year')
  if (yearEl) yearEl.textContent = String(new Date().getFullYear())

  const downloadBtn = document.getElementById('download-btn')
  if (downloadBtn) downloadBtn.addEventListener('click', () => window.print())
}

document.addEventListener('DOMContentLoaded', init)
