import { useState, useEffect } from "react";

interface ResourceLink {
  title: string;
  url?: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
}

interface ResourceSection {
  id: string;
  category: string;
  items: ResourceLink[];
}

const resources: ResourceSection[] = [
  {
    id: "kana",
    category: "Kana (Hiragana & Katakana)",
    items: [
      {
        title: "Tae Kim - The Writing System",
        url: "http://www.guidetojapanese.org/learn/grammar/writing",
        description:
          "Explains what kana are and what they are used for. Useful foundation if you are just starting.",
        badge: "Guide",
        badgeColor: "primary",
      },
    ],
  },
  {
    id: "kanji",
    category: "Kanji",
    items: [
      {
        title: "The 'Kanken Deck'",
        url: "https://mega.nz/file/VVdkUZbI#lGvxw2hDkw7JCEWa90cViY7cpYatf1SPUrE0Aw0OdDQ",
        description:
          "Recommended for learning how to write when you can already read.",
        badge: "Anki Deck",
        badgeColor: "info",
      },
      {
        title: "Chronopolize's Kanji Components",
        url: "https://ankiweb.net/shared/info/390273931",
        description:
          "An Anki deck to help you differentiate similar kanji by teaching their components.",
        badge: "Anki Deck",
        badgeColor: "info",
      },
      {
        title: "RRTK (Recognition Remembering The Kanji)",
        url: "https://www.learnkanji.guide/",
        description: "Guide on how to use RTK.",
        badge: "Method",
        badgeColor: "warning",
      },
    ],
  },
  {
    id: "grammar",
    category: "Grammar",
    items: [
      {
        title: "Tae Kim’s Guide to Japanese",
        url: "https://guidetojapanese.org/learn/grammar",
        description: "A classic, widely recommended grammar guide.",
        badge: "Guide",
        badgeColor: "primary",
      },
    ],
  },
  {
    id: "dictionaries",
    category: "Dictionaries",
    items: [
      {
        title: "Yomitan (Browser Add-on)",
        url: "https://github.com/themoeway/yomitan",
        description:
          "A pop-up dictionary that allows you to look up words easily while reading.",
        badge: "Essential",
        badgeColor: "success",
      },
      {
        title: "Jisho.org",
        url: "https://jisho.org",
        description: "Powerful bilingual dictionary. Great for beginners.",
        badge: "Bilingual",
        badgeColor: "primary",
      },
      {
        title: "OJAD (Pitch Accent)",
        url: "http://www.gavo.t.u-tokyo.ac.jp/ojad/",
        description:
          "Online Japanese Accent Dictionary. Useful for checking pitch accent.",
        badge: "Tool",
        badgeColor: "warning",
      },
    ],
  },
  {
    id: "tools",
    category: "Browser Extensions & Tools",
    items: [
      {
        title: "Language Learning with Netflix",
        url: "https://languagelearningwithnetflix.com/",
        description:
          "Enhance Netflix with dual subtitles and dictionary lookups.",
        badge: "Netflix",
        badgeColor: "danger",
      },
      {
        title: "Asbplayer",
        url: "https://github.com/killergerbah/asbplayer",
        description:
          "Load local subtitle files to video streaming sites for sentence mining.",
        badge: "Mining",
        badgeColor: "success",
      },
      {
        title: "Anki",
        url: "https://apps.ankiweb.net/",
        description:
          "The best flashcard app out there. Highly customizable and powerful SRS algorithm.",
        badge: "Tool",
        badgeColor: "warning",
      },
    ],
  },
  {
    id: "guides",
    category: "Guides & Motivation",
    items: [
      {
        title: "All Japanese All The Time (AJATT)",
        url: "https://web.archive.org/web/20230520002714/http://www.alljapaneseallthetime.com/blog/all-japanese-all-the-time-ajatt-how-to-learn-japanese-on-your-own-having-fun-and-to-fluency/",
        description:
          "The classic immersion mindset guide. Great for getting into the 'immersion spirit'.",
        badge: "Blog",
        badgeColor: "dark",
      },
    ],
  },
];

export default function Resources() {
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      // Check if at the bottom of the page
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        if (resources.length > 0) {
          setActiveSection(resources[resources.length - 1].id);
        }
        return;
      }

      // scroll logic
      const scrollPos = window.scrollY + 150;

      for (const resource of resources) {
        const section = document.getElementById(resource.id);
        if (
          section &&
          section.offsetTop <= scrollPos &&
          section.offsetTop + section.offsetHeight > scrollPos
        ) {
          setActiveSection(resource.id);
          break; // Stop after finding the first active section
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mt-5 pb-5 text-white">
      <div className="row">
        {/* Table of Contents */}
        <div className="col-md-3 d-none d-md-block">
          <div className="sticky-top" style={{ top: "100px" }}>
            <h5 className="text-white-50 mb-3 text-uppercase fs-6 tracking-wide">
              Contents
            </h5>
            <div className="list-group list-group-flush border-start border-secondary">
              {resources.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`list-group-item list-group-item-action bg-transparent border-0 py-2 ps-3 text-start ${
                    activeSection === section.id
                      ? "text-primary border-start border-primary border-2 fw-bold"
                      : "text-white-50 hover-text-white"
                  }`}
                  style={{
                    marginLeft: "-1px",
                    cursor: "pointer",
                  }}
                >
                  {section.category.split(" (")[0]}{" "}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="col-md-9">
          <div className="mb-5 border-bottom border-secondary pb-4">
            <h1 className="display-4 fw-bold">Learning Resources</h1>
            <p className="lead text-white-50">
              Resources for your Japanese journey.
            </p>
          </div>

          <div className="d-flex flex-column gap-5">
            {resources.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-5">
                <h2 className="h3 text-white mb-4 border-bottom border-secondary pb-2 d-flex align-items-center">
                  <span className="text-primary me-2">#</span>
                  {section.category}
                </h2>

                <div className="d-flex flex-column gap-3">
                  {section.items.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.url || "#"}
                      target={item.url ? "_blank" : "_self"}
                      rel="noreferrer"
                      className={`text-decoration-none p-4 rounded bg-dark bg-opacity-50 border border-secondary border-opacity-50 transition-all ${
                        item.url ? "resource-link-hover" : ""
                      }`}
                      style={{
                        transition: "transform 0.2s, background-color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (item.url) {
                          e.currentTarget.style.backgroundColor = "#2d2d2d";
                          e.currentTarget.style.transform = "translateX(5px)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (item.url) {
                          e.currentTarget.style.backgroundColor = "";
                          e.currentTarget.style.transform = "translateX(0)";
                        }
                      }}
                      onClick={(e) => !item.url && e.preventDefault()}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="h5 text-primary mb-0 fw-bold">
                          {item.title}
                        </h5>
                        {item.badge && (
                          <span
                            className={`badge bg-${
                              item.badgeColor || "secondary"
                            } bg-opacity-75 text-white`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-white-50 mb-0">{item.description}</p>
                      {item.url && (
                        <div className="mt-2 text-muted small">
                          🔗 {new URL(item.url).hostname}
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
