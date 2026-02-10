import React from 'react'
import './AboutPage.css'

const AboutPage = () => {
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
                <span className="image-icon">🍽️</span>
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
              <div className="value-icon">🎯</div>
              <h3 className="value-title">Vienkāršība</h3>
              <p className="value-description">
                Mēs padarām rezervāciju procesu tik vienkāršu, cik vien iespējams. Tikai daži klikšķi un jūsu galds ir rezervēts.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">⭐</div>
              <h3 className="value-title">Kvalitāte</h3>
              <p className="value-description">
                Mēs strādājam tikai ar labākajiem restorāniem, kas nodrošina izcilu pieredzi un augstu kvalitāti.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3 className="value-title">Uzticamība</h3>
              <p className="value-description">
                Jūs varat uzticēties mums. Mēs garantējam, ka jūsu rezervācija tiks apstiprināta un jūs saņemsiet atgādinājumu.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
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
              <div className="member-avatar">👨‍💼</div>
              <h3 className="member-name">Jānis Bērziņš</h3>
              <p className="member-role">CEO & Dibinātājs</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💻</div>
              <h3 className="member-name">Anna Kalniņa</h3>
              <p className="member-role">CTO</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍🎨</div>
              <h3 className="member-name">Pēteris Ozols</h3>
              <p className="member-role">Dizaina direktors</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💼</div>
              <h3 className="member-name">Līga Liepa</h3>
              <p className="member-role">Mārketinga direktore</p>
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
