import React, { useState } from 'react'
import './AboutPage.css'

const AboutPage = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [contactStatus, setContactStatus] = useState({
    type: 'idle',
    message: '',
  })

  const handleContactChange = (event) => {
    const { name, value } = event.target
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (contactStatus.type !== 'idle') {
      setContactStatus({ type: 'idle', message: '' })
    }
  }

  const handleContactSubmit = (event) => {
    event.preventDefault()

    const trimmedName = contactForm.name.trim()
    const trimmedEmail = contactForm.email.trim()
    const trimmedMessage = contactForm.message.trim()

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setContactStatus({
        type: 'error',
        message: 'Lūdzu aizpildiet visus laukus.',
      })
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(trimmedEmail)) {
      setContactStatus({
        type: 'error',
        message: 'Lūdzu ievadiet derīgu e-pasta adresi.',
      })
      return
    }

    // Šeit nākotnē var pieslēgt API pieprasījumu.
    // Pašlaik parādam paziņojumu un notīram formu.
    setContactStatus({
      type: 'success',
      message: 'Paldies! Mēs saņēmām jūsu ziņu un atbildēsim pēc iespējas ātrāk.',
    })
    setContactForm({
      name: '',
      email: '',
      message: '',
    })
  }

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">Par mums</h1>
          <p className="about-subtitle">Mēs palīdzam jums atrast perfektu galdu jebkurai gadījumam</p>
        </div>
      </div>

      <section className="about-story">
        <div className="content-container">
          <div className="story-content">
            <div className="story-text">
              <h2 className="section-title">Mūsu stāsts</h2>
              <p className="story-paragraph">
                Tables ir vadošā platforma restorānu rezervācijām Latvijā. Mēs sākām savu ceļu 2020. gadā ar vienkāršu mērķi - padarīt restorānu rezervācijas pieejamas un ērtas ikvienam.
              </p>
              <p className="story-paragraph">
                Mūsu komanda strādā ar simtiem restorānu visā Latvijā, no Rīgas centra līdz Jūrmalas krastiem, lai nodrošinātu, ka jūs vienmēr varat atrast perfektu vietu jebkurai īpašai brīdim.
              </p>
              <p className="story-paragraph">
                Mēs ticam, ka laba ēdiena pieredze sākas ar vieglu rezervāciju. Tāpēc mēs esam izveidojuši platformu, kas ir vienkārša, ātra un uzticama.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <span className="image-icon"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="content-container">
          <h2 className="section-title centered">Mūsu vērtības</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-card-image-wrap">
                <img src="https://images.unsplash.com/photo-1506784362847-6d3105a5e4b2?w=600&h=400&fit=crop" alt="Vienkāršība" className="value-card-image" />
              </div>
              <h3 className="value-title">Vienkāršība</h3>
              <p className="value-description">
                Mēs padarām rezervāciju procesu tik vienkāršu, cik vien iespējams. Tikai daži klikšķi un jūsu galds ir rezervēts.
              </p>
            </div>
            <div className="value-card">
              <div className="value-card-image-wrap">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop" alt="Kvalitāte" className="value-card-image" />
              </div>
              <h3 className="value-title">Kvalitāte</h3>
              <p className="value-description">
                Mēs strādājam tikai ar labākajiem restorāniem, kas nodrošina izcilu pieredzi un augstu kvalitāti.
              </p>
            </div>
            <div className="value-card">
              <div className="value-card-image-wrap">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" alt="Uzticamība" className="value-card-image" />
              </div>
              <h3 className="value-title">Uzticamība</h3>
              <p className="value-description">
                Jūs varat uzticēties mums. Mēs garantējam, ka jūsu rezervācija tiks apstiprināta un jūs saņemsiet atgādinājumu.
              </p>
            </div>
            <div className="value-card">
              <div className="value-card-image-wrap">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop" alt="Inovācija" className="value-card-image" />
              </div>
              <h3 className="value-title">Inovācija</h3>
              <p className="value-description">
                Mēs pastāvīgi uzlabojam mūsu platformu, lai nodrošinātu labāko iespējamo pieredzi mūsu lietotājiem.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="content-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Restorāni</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Rezervācijas mēnesī</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100K+</div>
              <div className="stat-label">Aktīvi lietotāji</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4.8</div>
              <div className="stat-label">Vidējais vērtējums</div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="content-container">
          <h2 className="section-title centered">Mūsu komanda</h2>
          <p className="team-subtitle">
            Mēs esam apvienojuši pieredzi un entuziasmu, lai radītu labāko restorānu rezervāciju platformu Latvijā.
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar-wrap">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" alt="Adrians Vanags" className="member-avatar-img" />
              </div>
              <h3 className="member-name">Adrians Vanags</h3>
              <p className="member-role">Dibinātājs</p>
            </div>
      
          </div>
        </div>
      </section>

      <section className="about-contact" id="contact">
        <div className="content-container">
          <div className="contact-layout">
            <div className="contact-intro">
              <h2 className="section-title">Sazinies ar mums</h2>
              <p className="contact-subtitle">
                Jautājumi par rezervācijām, sadarbību vai idejām platformas uzlabošanai – raksti mums,
                un mūsu komanda atbildēs personīgi.
              </p>
              <div className="contact-meta">
                <div className="contact-meta-item">
                  <span className="contact-label">E-pasts</span>
                  <a href="mailto:support@garso.lv" className="contact-link">support@garso.lv</a>
                </div>
                <div className="contact-meta-item">
                  <span className="contact-label">Darba laiks</span>
                  <p className="contact-text">Darba dienās 9:00 – 18:00</p>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
                <div className="contact-row">
                  <div className="contact-field">
                    <label htmlFor="contact-name">Vārds</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      placeholder="Kā jūs sauc?"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="contact-email">E-pasta adrese</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="jusu@epasts.lv"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-message">Ziņojums</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    placeholder="Pastāstiet, kā varam palīdzēt."
                    required
                  />
                </div>

                {contactStatus.type !== 'idle' && (
                  <p
                    className={
                      contactStatus.type === 'error'
                        ? 'contact-status contact-status-error'
                        : 'contact-status contact-status-success'
                    }
                  >
                    {contactStatus.message}
                  </p>
                )}

                <button type="submit" className="contact-submit">
                  Nosūtīt ziņu
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="content-container">
          <div className="cta-content">
            <h2 className="cta-title">Gatavs sākt?</h2>
            <p className="cta-description">
              Atrodiet savu perfekto galdu jau šodien un izbaudiet neaizmirstamu ēdiena pieredzi.
            </p>
            <a href="/" className="cta-button">Meklēt restorānu</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
