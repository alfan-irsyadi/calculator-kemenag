import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    skdScore: '',
    skbCatQuestions: ''||100,
    skbCatCorrect: ''||0,
    skbPraktik: ''||0,
    skbWawancara: ''||0
  })
  const [result, setResult] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    if (formData.skdScore !== '') {
      calculateScore()
    }
  }, [formData])

  const calculateScore = () => {
    // Convert inputs to numbers
    const skbCatQuestions = parseFloat(formData.skbCatQuestions)
    const skd = Math.min(parseFloat(formData.skdScore) || 0, 550)
    const skbCatTotal = (parseFloat(formData.skbCatCorrect) || 0)
    const skbPraktik = Math.min(parseFloat(formData.skbPraktik) || 0, 100)
    const skbWawancara = Math.min(parseFloat(formData.skbWawancara) || 0, 100)
    
    // Calculate SKD component (40% weight)
    const skdComponent = (skd / 550) * 40

    // Calculate average of SKB components (60% weight)
    const skbAverage = ((skbCatTotal / (skbCatQuestions*5) * 50 + skbPraktik/100 * 40 + skbWawancara/100 * 10))
    const skbComponent = (skbAverage / 100) * 60

    // Calculate final score
    const finalScore = skdComponent + skbComponent

    setResult({
      skdComponent: skdComponent.toFixed(4),
      skbComponent: skbComponent.toFixed(4),
      finalScore: finalScore.toFixed(4)
    })
  }

  return (
    <div className="calculator-container">
      <h1>Kalkulator Nilai CPNS</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-section">
          <h2>SKD (Bobot 40%)</h2>
          <div className="input-group">
            <label>
              Nilai SKD (Max 550):
              <input
                type="number"
                name="skdScore"
                value={formData.skdScore}
                onChange={handleInputChange}
                max="550"
                step="1"
                placeholder="0-550"
              />
            </label>
          </div>
        </div>

        <div className="form-section">
          <h2>SKB (Bobot 60%)</h2>
          <div className="input-group">
            <label>
              Jumlah Soal SKB CAT:
              <input
                type="number"
                name="skbCatQuestions"
                value={formData.skbCatQuestions}
                onChange={handleInputChange}
                min="0"
                placeholder="Jumlah soal"
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              Skor SKB CAT bobot 50%:
              <input
                type="number"
                name="skbCatCorrect"
                value={formData.skbCatCorrect}
                onChange={handleInputChange}
                max={formData.skbCatQuestions*5}
                placeholder="Jumlah benar"
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              Nilai SKB Praktik Kerja (Max 100) bobot 40%:
              <input
                type="number"
                name="skbPraktik"
                value={formData.skbPraktik}
                onChange={handleInputChange}
                max="100"
                step="0.01"
                placeholder="0-100"
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              Nilai SKB Wawancara (Max 100) bobot 10%:
              <input
                type="number"
                name="skbWawancara"
                value={formData.skbWawancara}
                onChange={handleInputChange}
                max="100"
                step="0.01"
                placeholder="0-100"
              />
            </label>
          </div>
        </div>
      </form>

      { (
        <div className="result-section">
          <h2>Hasil Perhitungan</h2>
          <div className="result-item">
            <span>Komponen SKD (40%):</span>
            <span>{result?.skdComponent || '0.0000'}%</span>
          </div>
          <div className="result-item">
            <span>Komponen SKB (60%):</span>
            <span>{result?.skbComponent || '0.0000'}%</span>
          </div>
          <div className="result-item total">
            <span>Nilai Akhir:</span>
            <span>{result?.finalScore || '0.0000'}%</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
