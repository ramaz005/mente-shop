export default function About() {
  return (
    <div style={{ backgroundColor: 'var(--bone)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{
        backgroundColor: 'var(--espresso)',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <p style={{
          fontFamily: 'Anonymous Pro',
          fontSize: '11px',
          color: 'var(--golden-matcha)',
          letterSpacing: '6px',
          marginBottom: '24px'
        }}>
          BASED IN MOSCOW. INSPIRED BY SPAIN.
        </p>
        <h1 style={{
          fontFamily: 'Arial Black',
          fontSize: 'clamp(60px, 12vw, 140px)',
          color: 'var(--bone)',
          letterSpacing: '8px',
          lineHeight: '0.9',
          marginBottom: '40px'
        }}>
          MENTE
        </h1>
        <p style={{
          fontFamily: 'Caveat',
          fontSize: '24px',
          color: 'var(--blush)',
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          mind muscle connection.
        </p>
      </section>

      {/* О БРЕНДЕ */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: '1px solid var(--espresso)'
      }}>
        <div style={{
          padding: '80px',
          borderRight: '1px solid var(--espresso)',
          backgroundColor: 'var(--bone)'
        }}>
          <p style={{
            fontFamily: 'Anonymous Pro',
            fontSize: '10px',
            letterSpacing: '4px',
            color: 'var(--spanish-sun)',
            marginBottom: '24px'
          }}>
            О БРЕНДЕ
          </p>
          <h2 style={{
            fontFamily: 'Arial Black',
            fontSize: '32px',
            letterSpacing: '2px',
            color: 'var(--espresso)',
            marginBottom: '32px',
            lineHeight: '1.2'
          }}>
            РОЖДЁН ПОД ПАЛЯЩИМ СОЛНЦЕМ СЕВИЛЬИ
          </h2>
          <p style={{
            fontFamily: 'Anonymous Pro',
            fontSize: '13px',
            lineHeight: '2',
            color: 'var(--espresso)',
            opacity: 0.8
          }}>
            Вдохновлённый огненным ритмом фламенко, MENTE создаёт спортивную одежду,
            в которой каждая девушка ощущает свою силу и неотразимость.
          </p>
        </div>
        <div style={{
          padding: '80px',
          backgroundColor: 'var(--spanish-sun)'
        }}>
          <p style={{
            fontFamily: 'Anonymous Pro',
            fontSize: '10px',
            letterSpacing: '4px',
            color: 'var(--lemon-pie)',
            marginBottom: '24px'
          }}>
            ФИЛОСОФИЯ
          </p>
          <p style={{
            fontFamily: 'Anonymous Pro',
            fontSize: '13px',
            lineHeight: '2.2',
            color: 'var(--bone)'
          }}>
            Мы верим, что истинная сексуальность рождается из уверенности,
            а уверенность — из гармонии тела и разума. MENTE — это ваш внутренний огонь,
            облечённый в форму. Это пламя, которое не скрыть.
          </p>
        </div>
      </section>

      {/* МИССИЯ */}
      <section style={{
        backgroundColor: 'var(--espresso)',
        padding: '100px 80px',
        textAlign: 'center'
      }}>
        <p style={{
          fontFamily: 'Anonymous Pro',
          fontSize: '10px',
          letterSpacing: '4px',
          color: 'var(--golden-matcha)',
          marginBottom: '32px'
        }}>
          МИССИЯ
        </p>
        <h2 style={{
          fontFamily: 'Arial Black',
          fontSize: 'clamp(28px, 4vw, 52px)',
          color: 'var(--bone)',
          letterSpacing: '3px',
          maxWidth: '900px',
          margin: '0 auto 40px',
          lineHeight: '1.3'
        }}>
          МЫ ВОЗВРАЩАЕМ ОЩУЩЕНИЕ СВОБОДЫ ДЕВУШКАМ, ЗАЖАТЫМ В РАМКИ БУДНЕЙ
        </h2>
        <p style={{
          fontFamily: 'Caveat',
          fontSize: '22px',
          color: 'var(--blush)',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.8'
        }}>
          Потому что свобода — это не место на карте, а состояние, которое ты носишь на себе.
        </p>
      </section>

      {/* ЦЕННОСТИ */}
      <section>
        <div style={{
          padding: '60px 80px 40px',
          borderBottom: '1px solid var(--espresso)'
        }}>
          <p style={{
            fontFamily: 'Anonymous Pro',
            fontSize: '10px',
            letterSpacing: '4px',
            color: 'var(--spanish-sun)'
          }}>
            ЦЕННОСТИ
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)'
        }}>
          {[
            {
              title: 'СВОБОДА В РАМКАХ РЕАЛЬНОСТИ',
              text: 'Мы не призываем бросить всё и улететь на Бали. Мы даём инструмент чувствовать свободу здесь и сейчас — в метро, на паре, в офисе. Потому что свобода — это не географическая точка, а состояние духа.',
              bg: 'var(--bone)',
              color: 'var(--espresso)'
            },
            {
              title: 'ЧЕСТНОСТЬ',
              text: 'Качественная ткань, выверенная посадка, продуманная функциональность — не маркетинговые обещания, а стандарт. Мы не экономим на том, что касается твоего тела и комфорта.',
              bg: 'var(--persian-plum)',
              color: 'var(--bone)'
            },
            {
              title: 'ИНДИВИДУАЛЬНОСТЬ ПРОТИВ МАССОВОСТИ',
              text: 'Ты устала быть одной из тысяч в сером масс-маркете. Мы создаём узнаваемый дизайн, вдохновлённый мировыми трендами, но адаптированный под твою реальность.',
              bg: 'var(--lemon-pie)',
              color: 'var(--espresso)'
            },
            {
              title: 'СВОБОДА КАК ФИЛОСОФИЯ',
              text: 'Мы для тех, кто не сидит на месте — физически и ментально. Кто качает не только тело, но и жизнь. Наша одежда — для тех, кто движется вперёд, даже когда система тормозит.',
              bg: 'var(--espresso)',
              color: 'var(--bone)'
            }
          ].map((item, i) => (
            <div key={i} style={{
              padding: '64px',
              backgroundColor: item.bg,
              borderRight: i % 2 === 0 ? '1px solid var(--espresso)' : 'none',
              borderBottom: '1px solid var(--espresso)'
            }}>
              <h3 style={{
                fontFamily: 'Arial Black',
                fontSize: '16px',
                letterSpacing: '2px',
                color: item.color,
                marginBottom: '20px',
                lineHeight: '1.3'
              }}>
                {item.title}
              </h3>
              <p style={{
                fontFamily: 'Anonymous Pro',
                fontSize: '13px',
                lineHeight: '2',
                color: item.color,
                opacity: 0.85
              }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BIG IDEA */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        borderBottom: '1px solid var(--espresso)'
      }}>
        {[
          {
            label: 'ИНСАЙТ',
            text: 'Молодые московские девушки мечтают о закатах в Марокко не потому, что хотят сбежать. Им нужно ощущение ветра, соли на коже, адреналина — чувство, что ты живая.',
            bg: 'var(--bone)'
          },
          {
            label: 'НАПРЯЖЕНИЕ',
            text: 'Ты живёшь в сером коридоре между мечтой и реальностью. Твоя одежда либо функциональна (но уныла), либо стильна (но непрактична). Ты вынуждена выбирать, хотя не должна.',
            bg: 'var(--blush)'
          },
          {
            label: 'РЕШЕНИЕ',
            text: 'Каждый комплект — это билет к той версии себя, которая не ждёт отпуска, чтобы почувствовать себя живой. В московской реальности, с московским бюджетом, но с океанским духом внутри.',
            bg: 'var(--spanish-sun)'
          }
        ].map((item, i) => (
          <div key={i} style={{
            padding: '64px 48px',
            backgroundColor: item.bg,
            borderRight: i < 2 ? '1px solid var(--espresso)' : 'none'
          }}>
            <p style={{
              fontFamily: 'Anonymous Pro',
              fontSize: '10px',
              letterSpacing: '4px',
              color: i === 2 ? 'var(--lemon-pie)' : 'var(--spanish-sun)',
              marginBottom: '24px'
            }}>
              {item.label}
            </p>
            <p style={{
              fontFamily: 'Anonymous Pro',
              fontSize: '13px',
              lineHeight: '2',
              color: i === 2 ? 'var(--bone)' : 'var(--espresso)'
            }}>
              {item.text}
            </p>
          </div>
        ))}
      </section>

      {/* ПЕРСОНА БРЕНДА */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: '1px solid var(--espresso)'
      }}>
        <div style={{
          padding: '80px',
          borderRight: '1px solid var(--espresso)'
        }}>
          <p style={{
            fontFamily: 'Anonymous Pro',
            fontSize: '10px',
            letterSpacing: '4px',
            color: 'var(--spanish-sun)',
            marginBottom: '32px'
          }}>
            ПЕРСОНА БРЕНДА
          </p>
          <h2 style={{
            fontFamily: 'Arial Black',
            fontSize: '40px',
            letterSpacing: '2px',
            color: 'var(--espresso)',
            marginBottom: '8px'
          }}>
            ВЕРА
          </h2>
          <p style={{
            fontFamily: 'Caveat',
            fontSize: '20px',
            color: 'var(--persian-plum)',
            marginBottom: '40px'
          }}>
            27 лет · Москва (но душой — везде)
          </p>
          <p style={{
            fontFamily: 'Anonymous Pro',
            fontSize: '12px',
            color: 'var(--espresso)',
            opacity: 0.6,
            letterSpacing: '2px',
            marginBottom: '12px'
          }}>
            ПРОФЕССИЯ
          </p>
          <p style={{
            fontFamily: 'Anonymous Pro',
            fontSize: '13px',
            color: 'var(--espresso)',
            marginBottom: '32px'
          }}>
            Независимый фотограф / креативный директор
          </p>
          {[
            'Свободолюбивая, но ответственная',
            'Прямая, но тёплая',
            'Амбициозная, но реалистичная',
            'Бунтарка с океанским духом'
          ].map((trait, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--spanish-sun)',
                borderRadius: '50%',
                flexShrink: 0
              }} />
              <p style={{
                fontFamily: 'Anonymous Pro',
                fontSize: '13px',
                color: 'var(--espresso)'
              }}>
                {trait}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          padding: '80px',
          backgroundColor: 'var(--espresso)'
        }}>
          <p style={{
            fontFamily: 'Anonymous Pro',
            fontSize: '10px',
            letterSpacing: '4px',
            color: 'var(--golden-matcha)',
            marginBottom: '32px'
          }}>
            ДЕНЬ ВЕРЫ
          </p>
          <p style={{
            fontFamily: 'Caveat',
            fontSize: '20px',
            color: 'var(--lemon-pie)',
            marginBottom: '24px'
          }}>
            Кофейня в Москве. 10 утра. Среда.
          </p>
          <p style={{
            fontFamily: 'Anonymous Pro',
            fontSize: '13px',
            lineHeight: '2.2',
            color: 'var(--blush)'
          }}>
            Вера сидит у окна с ноутбуком. На ней бордовый корсетный топ,
            прямые джинсы, грубые ботинки. Волосы в небрежном пучке.
            В наушниках — инди-плейлист. На столе — матча латте и блокнот с набросками.
          </p>
          <br />
          <p style={{
            fontFamily: 'Anonymous Pro',
            fontSize: '13px',
            lineHeight: '2.2',
            color: 'var(--blush)'
          }}>
            Она монтирует фото с последней съёмки. Иногда поднимает взгляд
            на улицу — серое московское небо, люди спешат на работу.
          </p>
          <br />
          <p style={{
            fontFamily: 'Caveat',
            fontSize: '20px',
            color: 'var(--golden-matcha)',
            lineHeight: '1.6'
          }}>
            "Я всё ещё ловлю эту волну. Каждый день."
          </p>
        </div>
      </section>

      {/* ВИДЕНИЕ */}
      <section style={{ padding: '100px 80px', backgroundColor: 'var(--bone)' }}>
        <p style={{
          fontFamily: 'Anonymous Pro',
          fontSize: '10px',
          letterSpacing: '4px',
          color: 'var(--spanish-sun)',
          marginBottom: '48px'
        }}>
          ВИДЕНИЕ
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          backgroundColor: 'var(--espresso)'
        }}>
          {[
            {
              stage: '01',
              title: 'КУЛЬТОВЫЙ БРЕНД МОСКВЫ',
              period: '1-2 года',
              text: 'Становимся узнаваемым именем в залах, кофейнях и Instagram. Наш корсетный топ знает каждая вторая на йоге или в зале.',
              bg: 'var(--bone)'
            },
            {
              stage: '02',
              title: 'ЛАЙФСТАЙЛ-ПЛАТФОРМА',
              period: '3-4 года',
              text: 'Мы — больше, чем одежда. Создаём события: сёрф-путешествия, выезды, коллаборации. Открываем пространства — примерить вещи, выпить кофе.',
              bg: 'var(--blush)'
            },
            {
              stage: '03',
              title: 'СИМВОЛ ПОКОЛЕНИЯ',
              period: '5+ лет',
              text: 'Мы — голос нового поколения. Нас носят в зале и на улицах городов России. Для международных СМИ мы — «русский ответ Alo Yoga, но с бунтарским духом».',
              bg: 'var(--lemon-pie)'
            }
          ].map((item, i) => (
            <div key={i} style={{
              padding: '48px',
              backgroundColor: item.bg
            }}>
              <p style={{
                fontFamily: 'Arial Black',
                fontSize: '48px',
                color: 'var(--spanish-sun)',
                opacity: 0.3,
                marginBottom: '16px'
              }}>
                {item.stage}
              </p>
              <p style={{
                fontFamily: 'Anonymous Pro',
                fontSize: '10px',
                letterSpacing: '2px',
                color: 'var(--persian-plum)',
                marginBottom: '12px'
              }}>
                {item.period}
              </p>
              <h3 style={{
                fontFamily: 'Arial Black',
                fontSize: '16px',
                letterSpacing: '1px',
                color: 'var(--espresso)',
                marginBottom: '16px',
                lineHeight: '1.3'
              }}>
                {item.title}
              </h3>
              <p style={{
                fontFamily: 'Anonymous Pro',
                fontSize: '12px',
                lineHeight: '2',
                color: 'var(--espresso)',
                opacity: 0.8
              }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* СЛОГАН */}
      <section style={{
        backgroundColor: 'var(--persian-plum)',
        padding: '100px 40px',
        textAlign: 'center'
      }}>
        <p style={{
          fontFamily: 'Anonymous Pro',
          fontSize: '11px',
          letterSpacing: '4px',
          color: 'var(--golden-matcha)',
          marginBottom: '32px'
        }}>
          MIND MUSCLE CONNECTION.
        </p>
        <h2 style={{
          fontFamily: 'Arial Black',
          fontSize: 'clamp(24px, 4vw, 48px)',
          color: 'var(--bone)',
          letterSpacing: '3px',
          maxWidth: '800px',
          margin: '0 auto 24px',
          lineHeight: '1.3'
        }}>
          MENTE — ЭТО ВАШ ВНУТРЕННИЙ ОГОНЬ, К КОТОРОМУ МОЖНО ПРИКОСНУТЬСЯ
        </h2>
        <p style={{
          fontFamily: 'Caveat',
          fontSize: '22px',
          color: 'var(--lemon-pie)'
        }}>
          Based in Moscow. Inspired by Spain.
        </p>
      </section>

    </div>
  );
}