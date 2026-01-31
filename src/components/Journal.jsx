import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { characters } from '../data/characters';
import { locations } from '../data/locations';
import CharacterPortrait from './CharacterPortrait';

export default function Journal() {
  const { state, dispatch, canAccuse } = useGame();
  const [activeTab, setActiveTab] = useState('findings');
  
  const goBack = () => {
    if (state.currentLocation) {
      dispatch({ type: 'SET_SCREEN', payload: 'location' });
    } else {
      dispatch({ type: 'SET_SCREEN', payload: 'travel' });
    }
  };
  
  const goToTravel = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'travel' });
  };
  
  const goToAccusation = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'accusation' });
  };
  
  // Group clues by location
  const cluesByLocation = state.collectedClues.reduce((acc, clue) => {
    const loc = clue.foundAt || 'unknown';
    if (!acc[loc]) acc[loc] = [];
    acc[loc].push(clue);
    return acc;
  }, {});
  
  // Map dialogue flags to readable notes
  const flagNotes = {
    teddy_admitted_absence: "Teddy admits he stepped out during the set — claims 'five minutes'",
    bartender_contradicts_teddy: "★ CONTRADICTION: Jimmy says Teddy was gone for twenty minutes, not five",
    teddy_caught_lying: "★ Teddy changed his story when confronted about his whereabouts",
    teddy_confirmed_debt: "Teddy confirms Earl owed him money — gambling debt of $4,000",
    teddy_knew_about_starlight: "Teddy learned Earl was negotiating with The Starlight — visibly upset",
    learned_lorraine_knew_debt: "Lorraine knew about the gambling debt — 'made a scene' at the club",
    unlocked_lorraine: "Lorraine Jeffries lives at a brownstone on 138th Street",
    learned_ruthie_talked_to_delia: "Ruthie talked to Delia in the powder room before leaving",
    learned_ruthie_got_call: "Ruthie received a phone call that changed her mood — called someone 'honey'",
    learned_chet_in_alley: "Chet Malone (Earl's fired drummer) was seen in the alley before the show",
    unlocked_birdland: "Chet Malone can be found at Birdland most nights",
    learned_stranger_at_club: "Unknown man in nice suit was watching the band — left same time as Ruthie",
    learned_teddy_has_backers: "Teddy has 'backers' — suits who aren't jazz people. He owes someone.",
    snap_alibi_confirmed: "★ ALIBI: Snap was at Van Gelder's studio all night — Rudy's logs confirm",
    learned_snap_stealing: "Snap was copying Earl's arrangements and selling them — Earl found out",
    argument_tape_available: "Rudy has a tape of Earl arguing with Teddy about money",
    heard_teddy_threat: "★ ON TAPE: Teddy threatened Earl — 'That can be arranged'",
    confirmed_earl_leaving: "Earl was leaving for The Starlight — better money, fresh start",
    teddy_visited_earl: "Teddy visited Earl's apartment last week — they argued about 'what he was owed'",
    apartment_searched: "Earl's apartment was ransacked around 3 AM — someone was looking for something",
    hidden_compartment: "Earl had a hidden compartment behind his desk drawer",
    earl_feared_for_life: "Earl asked Lorraine to take out insurance — said someone was threatening him",
    earl_feared_teddy: "★ Earl specifically feared TEDDY — told Lorraine 'if anything happened to him'",
    lorraine_alibi_confirmed: "★ ALIBI: Lorraine was with her sister Mae all night — playing cards until 2 AM",
    chet_confronted_earl: "Chet confronted Earl in the alley before the show — Earl laughed at him",
    timeline_teddy_contradiction: "★ TIMELINE: Teddy lied about how long he was gone during the second set",
    timeline_ruthie_contradiction: "★ TIMELINE: Ruthie lied about being sick — but she has an alibi",
    chet_saw_teddy_argument: "★ Chet witnessed Teddy and Earl arguing in the alley — Teddy was furious",
    chet_witnessed_threat: "Chet heard Teddy say 'not leaving' and 'what he was owed' — Earl looked scared",
    chet_alibi_established: "★ ALIBI: Chet was at Birdland from 11 PM until closing",
    chet_will_testify: "Chet will testify about what he witnessed in the alley",
    ruthie_was_at_birdland: "★ Ruthie was at Birdland the night of the murder — meeting with Prestige A&R",
    ruthie_admitted_meeting: "Ruthie admits she lied — was making her own record deal, not sick",
    snap_reconciled: "Snap and Earl had patched things up — Earl gave him another chance",
    snap_confirms_motive: "Snap confirms Teddy's motive — debt + Earl leaving = financial ruin",
    teddy_in_trouble: "★ Teddy borrowed from dangerous people — his backers want their money",
    starlight_deal_confirmed: "Earl had agreed in principle to move to The Starlight",
    ruthie_suspects_teddy: "Ruthie says Earl was scared of Teddy — would flinch when Teddy touched him",
  };
  
  const activeFlags = Object.entries(state.dialogueFlags)
    .filter(([_, value]) => value === true)
    .map(([key]) => ({ key, note: flagNotes[key] || key }))
    .filter(f => f.note);
  
  const importantNotes = activeFlags.filter(f => f.note.startsWith('★'));
  const regularNotes = activeFlags.filter(f => !f.note.startsWith('★'));
  
  const tabs = [
    { id: 'findings', label: 'Key Findings', icon: '⭐', count: importantNotes.length },
    { id: 'evidence', label: 'Evidence', icon: '📋', count: state.collectedClues.length },
    { id: 'suspects', label: 'Suspects', icon: '👤', count: state.interviewedCharacters.length },
    { id: 'notes', label: 'Notes', icon: '📝', count: regularNotes.length },
  ];
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Leather notebook background */}
      <div className="notebook-leather-bg" />
      
      {/* Paper texture overlay for content area */}
      <div className="notebook-paper-texture" />
      
      {/* Spiral binding edge */}
      <div className="notebook-spiral" />
      
      {/* Content */}
      <div className="relative z-10 p-4 sm:p-8 md:p-12 pb-32 sm:pb-40">
        <div className="scene-enter max-w-5xl mx-auto">
          
          {/* Notebook header - case file style */}
          <header className="notebook-header mb-6 sm:mb-10">
            <button
              onClick={goBack}
              className="mb-4 sm:mb-6 text-amber-900/70 hover:text-amber-900 transition-colors flex items-center gap-2 text-base sm:text-xl"
            >
              <span>←</span>
              <span className="notebook-handwriting">Back to investigation</span>
            </button>
            
            {/* Case file stamp and title */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
              <div className="case-file-stamp">
                <span className="stamp-text">CASE FILE</span>
                <span className="stamp-number">#1965-127</span>
              </div>
              
              <div className="flex-1">
                <h1 className="notebook-title text-3xl sm:text-5xl md:text-6xl mb-2">
                  Detective's Journal
                </h1>
                <p className="notebook-subtitle text-lg sm:text-2xl">
                  Re: The murder of Earl "Duke" Jeffries
                </p>
                <p className="notebook-date text-sm sm:text-base mt-2">
                  The Ember Room • November 15, 1965
                </p>
              </div>
            </div>
            
            {/* Red thread decoration */}
            <div className="red-thread-divider mt-4 sm:mt-6" />
          </header>
          
          {/* Tab navigation - notebook tabs style */}
          <nav className="notebook-tabs mb-6 sm:mb-8">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`notebook-tab ${activeTab === tab.id ? 'active' : ''}`}
                style={{ '--tab-index': index }}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label hidden sm:inline">{tab.label}</span>
                {tab.count > 0 && (
                  <span className="tab-count">{tab.count}</span>
                )}
              </button>
            ))}
          </nav>
          
          {/* Tab content */}
          <div className="notebook-content">
            
            {/* KEY FINDINGS TAB */}
            {activeTab === 'findings' && (
              <div className="notebook-page animate-page-turn">
                <h2 className="notebook-section-title">
                  <span className="section-icon">⭐</span>
                  Key Findings
                </h2>
                
                {importantNotes.length === 0 ? (
                  <div className="notebook-empty">
                    <p className="notebook-handwriting italic">
                      No major breakthroughs yet...
                    </p>
                    <p className="text-amber-800/60 text-sm mt-2">
                      Keep investigating. The truth is out there.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {importantNotes.map(({ key, note }, idx) => (
                      <div 
                        key={key}
                        className="finding-card"
                        style={{ '--delay': `${idx * 0.1}s` }}
                      >
                        <div className="finding-pin" />
                        <div className="finding-content">
                          <p className="notebook-handwriting text-base sm:text-lg md:text-xl">
                            {note.replace('★ ', '')}
                          </p>
                        </div>
                        {idx < importantNotes.length - 1 && (
                          <div className="red-thread-connector" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* EVIDENCE TAB */}
            {activeTab === 'evidence' && (
              <div className="notebook-page animate-page-turn">
                <h2 className="notebook-section-title">
                  <span className="section-icon">📋</span>
                  Collected Evidence
                  <span className="section-count">({state.collectedClues.length})</span>
                </h2>
                
                {state.collectedClues.length === 0 ? (
                  <div className="notebook-empty">
                    <p className="notebook-handwriting italic">
                      No physical evidence collected yet.
                    </p>
                    <p className="text-amber-800/60 text-sm mt-2">
                      Search locations thoroughly. Every detail matters.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 sm:space-y-8">
                    {Object.entries(cluesByLocation).map(([locId, clues]) => {
                      const location = locations[locId];
                      return (
                        <div key={locId} className="evidence-location-group">
                          <h3 className="location-label">
                            <span className="location-marker">📍</span>
                            {location?.name || locId}
                          </h3>
                          <div className="evidence-cards">
                            {clues.map((clue, idx) => (
                              <div 
                                key={clue.id}
                                className="evidence-card"
                                style={{ '--rotation': `${(idx % 3 - 1) * 2}deg` }}
                              >
                                <div className="evidence-tape" />
                                <div className="evidence-inner">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="evidence-title">{clue.name}</h4>
                                    {clue.type === 'audio' && (
                                      <span className="evidence-type-badge audio">🎵</span>
                                    )}
                                    {clue.type === 'testimonial' && (
                                      <span className="evidence-type-badge testimonial">💬</span>
                                    )}
                                  </div>
                                  <p className="evidence-description">{clue.description}</p>
                                  {clue.significance && (
                                    <p className="evidence-significance">→ {clue.significance}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            
            {/* SUSPECTS TAB */}
            {activeTab === 'suspects' && (
              <div className="notebook-page animate-page-turn">
                <h2 className="notebook-section-title">
                  <span className="section-icon">👤</span>
                  Persons of Interest
                  <span className="section-count">({state.interviewedCharacters.length} interviewed)</span>
                </h2>
                
                {state.interviewedCharacters.length === 0 ? (
                  <div className="notebook-empty">
                    <p className="notebook-handwriting italic">
                      No interviews conducted yet.
                    </p>
                    <p className="text-amber-800/60 text-sm mt-2">
                      Talk to everyone. Someone knows something.
                    </p>
                  </div>
                ) : (
                  <div className="suspect-board">
                    {state.interviewedCharacters.map((id, idx) => {
                      const char = characters[id];
                      if (!char) return null;
                      return (
                        <div 
                          key={id}
                          className="suspect-photo"
                          style={{ '--rotation': `${(idx % 5 - 2) * 3}deg` }}
                        >
                          {/* Pin at top */}
                          <div className="photo-pin" />
                          
                          {/* Polaroid-style frame */}
                          <div className="polaroid-frame">
                            <div className="polaroid-image">
                              <CharacterPortrait 
                                characterId={id} 
                                size={80}
                                className="w-full h-full object-cover"
                              />
                              {/* Suspect indicator */}
                              {char.isSuspect && (
                                <div className="suspect-badge">SUSPECT</div>
                              )}
                            </div>
                            <div className="polaroid-label">
                              <span className="suspect-name">{char.name}</span>
                              <span className="suspect-role">{char.role}</span>
                            </div>
                          </div>
                          
                          {/* Alibi status */}
                          {(state.dialogueFlags[`${id}_alibi_confirmed`] || 
                            (id === 'snap' && state.dialogueFlags.snap_alibi_confirmed) ||
                            (id === 'lorraine' && state.dialogueFlags.lorraine_alibi_confirmed) ||
                            (id === 'chet' && state.dialogueFlags.chet_alibi_established)) && (
                            <div className="alibi-stamp">ALIBI ✓</div>
                          )}
                          
                          {/* Red thread connections for suspects with key evidence */}
                          {char.isSuspect && idx < state.interviewedCharacters.length - 1 && (
                            <div className="red-thread-photo" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            
            {/* NOTES TAB */}
            {activeTab === 'notes' && (
              <div className="notebook-page animate-page-turn">
                <h2 className="notebook-section-title">
                  <span className="section-icon">📝</span>
                  Investigation Notes
                </h2>
                
                {regularNotes.length === 0 ? (
                  <div className="notebook-empty">
                    <p className="notebook-handwriting italic">
                      No notes yet...
                    </p>
                    <p className="text-amber-800/60 text-sm mt-2">
                      Details from conversations will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="notebook-lined-paper">
                    {regularNotes.map(({ key, note }, idx) => (
                      <div 
                        key={key}
                        className="notebook-line"
                        style={{ '--delay': `${idx * 0.05}s` }}
                      >
                        <span className="line-bullet">•</span>
                        <p className="notebook-handwriting">{note}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Case progress - always visible at bottom */}
            <div className="case-progress-section mt-8 sm:mt-12">
              <div className="progress-header">
                <span className="progress-label">Case Progress</span>
                <span className="progress-count">{state.collectedClues.length}/8 evidence</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${Math.min((state.collectedClues.length / 8) * 100, 100)}%` }}
                />
              </div>
              <p className="progress-status notebook-handwriting">
                {canAccuse 
                  ? "Ready to make an accusation."
                  : `Need ${8 - state.collectedClues.length} more pieces of evidence.`
                }
              </p>
              <p className="progress-stats">
                {state.unlockedLocations.length} locations • {state.interviewedCharacters.length} interviews
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 notebook-action-bar p-3 sm:p-4 flex flex-wrap gap-2 sm:gap-3 justify-center items-center z-30 safe-area-bottom">
        <button
          onClick={goToTravel}
          className="notebook-btn travel"
        >
          <span className="btn-icon">🚕</span>
          <span className="btn-text">TRAVEL</span>
        </button>
        
        {state.collectedClues.length >= 4 && (
          <button
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'timeline' })}
            className="notebook-btn timeline"
          >
            <span className="btn-icon">📊</span>
            <span className="btn-text">TIMELINE</span>
          </button>
        )}
        
        {state.collectedClues.length >= 2 && (
          <button
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'evidenceBoard' })}
            className="notebook-btn evidence"
          >
            <span className="btn-icon">📌</span>
            <span className="btn-text">BOARD</span>
          </button>
        )}
        
        {canAccuse && (
          <button
            onClick={goToAccusation}
            className="notebook-btn accuse"
          >
            <span className="btn-icon">⚖️</span>
            <span className="btn-text">ACCUSE</span>
          </button>
        )}
      </div>
      
      {/* Journal-specific styles */}
      <style>{`
        /* Leather notebook background */
        .notebook-leather-bg {
          position: fixed;
          inset: 0;
          background: 
            radial-gradient(ellipse at 30% 20%, rgba(139, 90, 43, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(101, 67, 33, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #3d2914 0%, #2a1d0d 50%, #1f150a 100%);
          z-index: 0;
        }
        
        /* Paper texture for content area */
        .notebook-paper-texture {
          position: fixed;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          width: min(95%, 900px);
          bottom: 100px;
          background: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 27px,
              rgba(139, 115, 85, 0.15) 27px,
              rgba(139, 115, 85, 0.15) 28px
            ),
            linear-gradient(180deg, #f5f0e1 0%, #ebe3d0 50%, #e0d6c0 100%);
          border-radius: 4px;
          box-shadow: 
            inset 0 0 30px rgba(139, 90, 43, 0.2),
            0 4px 20px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(139, 90, 43, 0.3);
          z-index: 1;
        }
        
        /* Spiral binding */
        .notebook-spiral {
          position: fixed;
          top: 80px;
          left: calc(50% - min(47.5%, 450px) - 15px);
          width: 30px;
          bottom: 120px;
          background: repeating-linear-gradient(
            180deg,
            transparent 0px,
            transparent 18px,
            #1a1a1a 18px,
            #1a1a1a 22px,
            transparent 22px,
            transparent 40px
          );
          z-index: 3;
        }
        
        .notebook-spiral::before {
          content: '';
          position: absolute;
          top: -5px;
          left: 8px;
          right: 8px;
          bottom: -5px;
          background: repeating-linear-gradient(
            180deg,
            #2a2a2a 0px,
            #3a3a3a 2px,
            #2a2a2a 4px
          );
          border-radius: 3px;
        }
        
        /* Notebook header styles */
        .notebook-header {
          position: relative;
          padding-bottom: 1rem;
        }
        
        .case-file-stamp {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.75rem 1rem;
          border: 3px solid #8b0000;
          border-radius: 4px;
          transform: rotate(-5deg);
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .stamp-text {
          font-family: 'Courier New', monospace;
          font-weight: bold;
          color: #8b0000;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
        }
        
        .stamp-number {
          font-family: 'Courier New', monospace;
          font-weight: bold;
          color: #8b0000;
          font-size: 1.25rem;
        }
        
        .notebook-title {
          font-family: 'Georgia', serif;
          color: #2a1d0d;
          text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.5);
        }
        
        .notebook-subtitle {
          font-family: 'Georgia', serif;
          color: #5c4033;
          font-style: italic;
        }
        
        .notebook-date {
          font-family: 'Courier New', monospace;
          color: #8b7355;
        }
        
        /* Red thread divider */
        .red-thread-divider {
          height: 3px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            #8b0000 10%, 
            #a52a2a 50%, 
            #8b0000 90%, 
            transparent 100%
          );
          position: relative;
        }
        
        .red-thread-divider::before,
        .red-thread-divider::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          background: #8b0000;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .red-thread-divider::before { left: 10%; }
        .red-thread-divider::after { right: 10%; }
        
        /* Tab navigation */
        .notebook-tabs {
          display: flex;
          gap: 0.25rem;
          padding: 0 0.5rem;
          position: relative;
        }
        
        .notebook-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: #d4c4a8;
          border: 1px solid #b8a88c;
          border-bottom: none;
          border-radius: 8px 8px 0 0;
          font-family: 'Georgia', serif;
          color: #5c4033;
          font-size: 0.875rem;
          transition: all 0.2s;
          transform: translateY(2px);
          box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .notebook-tab.active {
          background: #f5f0e1;
          transform: translateY(0);
          z-index: 2;
          box-shadow: 
            inset 0 2px 4px rgba(255, 255, 255, 0.5),
            0 -2px 4px rgba(0, 0, 0, 0.1);
          color: #2a1d0d;
        }
        
        .notebook-tab:hover:not(.active) {
          background: #e0d6c0;
        }
        
        .tab-icon { font-size: 1.25rem; }
        
        .tab-count {
          background: #8b0000;
          color: white;
          font-size: 0.7rem;
          padding: 0.1rem 0.4rem;
          border-radius: 10px;
          font-weight: bold;
        }
        
        /* Notebook content area */
        .notebook-content {
          background: transparent;
          position: relative;
          min-height: 400px;
        }
        
        .notebook-page {
          animation: pageTurn 0.4s ease-out;
        }
        
        @keyframes pageTurn {
          from {
            opacity: 0;
            transform: translateX(10px) rotateY(-5deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotateY(0);
          }
        }
        
        /* Section titles */
        .notebook-section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'Georgia', serif;
          font-size: 1.5rem;
          color: #2a1d0d;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #d4c4a8;
        }
        
        @media (min-width: 640px) {
          .notebook-section-title { font-size: 2rem; }
        }
        
        .section-icon { font-size: 1.5em; }
        .section-count {
          font-size: 0.6em;
          color: #8b7355;
          font-weight: normal;
        }
        
        /* Handwriting style */
        .notebook-handwriting {
          font-family: 'Georgia', serif;
          color: #2a1d0d;
          line-height: 1.6;
        }
        
        /* Empty state */
        .notebook-empty {
          text-align: center;
          padding: 3rem 1rem;
          color: #8b7355;
        }
        
        /* Finding cards with red thread */
        .finding-card {
          position: relative;
          padding: 1rem 1rem 1rem 2.5rem;
          background: linear-gradient(135deg, #fffef5 0%, #f5f0e1 100%);
          border-left: 4px solid #d4a017;
          box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.3s ease-out;
          animation-delay: var(--delay);
          animation-fill-mode: both;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .finding-pin {
          position: absolute;
          left: -8px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          background: radial-gradient(circle at 30% 30%, #ff6b6b, #8b0000);
          border-radius: 50%;
          box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
        }
        
        .red-thread-connector {
          position: absolute;
          left: -1px;
          bottom: -20px;
          width: 3px;
          height: 20px;
          background: linear-gradient(180deg, #8b0000, #a52a2a);
          z-index: -1;
        }
        
        /* Evidence cards */
        .evidence-location-group {
          margin-bottom: 2rem;
        }
        
        .location-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          color: #5c4033;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px dashed #d4c4a8;
        }
        
        .evidence-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }
        
        .evidence-card {
          position: relative;
          transform: rotate(var(--rotation, 0deg));
          transition: transform 0.3s;
        }
        
        .evidence-card:hover {
          transform: rotate(0deg) scale(1.02);
          z-index: 5;
        }
        
        .evidence-tape {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%) rotate(-2deg);
          width: 60px;
          height: 20px;
          background: linear-gradient(180deg, rgba(255, 230, 150, 0.9), rgba(230, 200, 120, 0.9));
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          z-index: 2;
        }
        
        .evidence-inner {
          background: #fffef8;
          padding: 1.25rem 1rem;
          border: 1px solid #d4c4a8;
          box-shadow: 
            2px 2px 8px rgba(0, 0, 0, 0.15),
            inset 0 0 20px rgba(139, 115, 85, 0.1);
        }
        
        .evidence-title {
          font-family: 'Georgia', serif;
          font-weight: bold;
          color: #2a1d0d;
          font-size: 1rem;
        }
        
        .evidence-type-badge {
          font-size: 0.75rem;
          padding: 0.1rem 0.3rem;
          border-radius: 3px;
        }
        
        .evidence-type-badge.audio { background: #e8d4f8; }
        .evidence-type-badge.testimonial { background: #d4e8f8; }
        
        .evidence-description {
          font-family: 'Georgia', serif;
          font-size: 0.875rem;
          color: #5c4033;
          margin-top: 0.5rem;
          line-height: 1.5;
        }
        
        .evidence-significance {
          font-family: 'Georgia', serif;
          font-size: 0.8rem;
          color: #b8860b;
          font-style: italic;
          margin-top: 0.5rem;
        }
        
        /* Suspect photo board */
        .suspect-board {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
          padding: 1rem;
        }
        
        .suspect-photo {
          position: relative;
          transform: rotate(var(--rotation, 0deg));
          transition: transform 0.3s, z-index 0s;
        }
        
        .suspect-photo:hover {
          transform: rotate(0deg) scale(1.1);
          z-index: 10;
        }
        
        .photo-pin {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
          background: radial-gradient(circle at 30% 30%, #ff4444, #8b0000);
          border-radius: 50%;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
          z-index: 3;
        }
        
        .photo-pin::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
        }
        
        .polaroid-frame {
          background: white;
          padding: 8px 8px 30px 8px;
          box-shadow: 
            0 4px 8px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(0, 0, 0, 0.1);
        }
        
        .polaroid-image {
          width: 100px;
          height: 100px;
          background: #333;
          position: relative;
          overflow: hidden;
        }
        
        @media (min-width: 640px) {
          .polaroid-image {
            width: 120px;
            height: 120px;
          }
        }
        
        .suspect-badge {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(139, 0, 0, 0.9);
          color: white;
          font-family: 'Courier New', monospace;
          font-size: 0.6rem;
          text-align: center;
          padding: 2px;
          letter-spacing: 0.1em;
        }
        
        .polaroid-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 8px;
        }
        
        .suspect-name {
          font-family: 'Georgia', serif;
          font-size: 0.8rem;
          color: #2a1d0d;
          font-weight: bold;
        }
        
        .suspect-role {
          font-family: 'Georgia', serif;
          font-size: 0.65rem;
          color: #8b7355;
        }
        
        .alibi-stamp {
          position: absolute;
          bottom: -5px;
          right: -10px;
          background: #228b22;
          color: white;
          font-family: 'Courier New', monospace;
          font-size: 0.6rem;
          padding: 2px 6px;
          transform: rotate(10deg);
          border-radius: 2px;
          font-weight: bold;
          letter-spacing: 0.05em;
        }
        
        .red-thread-photo {
          position: absolute;
          right: -30px;
          top: 50%;
          width: 30px;
          height: 3px;
          background: linear-gradient(90deg, #8b0000, #a52a2a);
          z-index: -1;
        }
        
        /* Notebook lined paper for notes */
        .notebook-lined-paper {
          background: repeating-linear-gradient(
            transparent,
            transparent 27px,
            rgba(139, 115, 85, 0.2) 27px,
            rgba(139, 115, 85, 0.2) 28px
          );
          padding: 0.5rem 0;
        }
        
        .notebook-line {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.4rem 0.5rem;
          min-height: 28px;
          animation: fadeIn 0.3s ease-out;
          animation-delay: var(--delay);
          animation-fill-mode: both;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .line-bullet {
          color: #8b7355;
          flex-shrink: 0;
        }
        
        /* Case progress */
        .case-progress-section {
          padding: 1rem;
          background: linear-gradient(135deg, rgba(212, 196, 168, 0.3) 0%, rgba(224, 214, 192, 0.3) 100%);
          border-radius: 8px;
          border: 1px dashed #b8a88c;
        }
        
        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .progress-label {
          font-family: 'Courier New', monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #5c4033;
        }
        
        .progress-count {
          font-family: 'Georgia', serif;
          font-size: 0.875rem;
          color: #2a1d0d;
        }
        
        .progress-bar-container {
          height: 12px;
          background: #d4c4a8;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #b8860b, #d4a017);
          border-radius: 6px;
          transition: width 0.5s ease-out;
        }
        
        .progress-status {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: #5c4033;
        }
        
        .progress-stats {
          font-family: 'Courier New', monospace;
          font-size: 0.7rem;
          color: #8b7355;
          margin-top: 0.25rem;
        }
        
        /* Action bar */
        .notebook-action-bar {
          background: linear-gradient(180deg, #3d2914 0%, #2a1d0d 100%);
          border-top: 3px solid #5c4033;
        }
        
        .notebook-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          font-weight: bold;
          letter-spacing: 0.05em;
          transition: all 0.2s;
          min-height: 44px;
        }
        
        .notebook-btn .btn-icon { font-size: 1.25rem; }
        .notebook-btn .btn-text { display: none; }
        
        @media (min-width: 480px) {
          .notebook-btn .btn-text { display: inline; }
        }
        
        .notebook-btn.travel {
          background: linear-gradient(135deg, #2c5aa0, #1e3d6f);
          color: white;
          border: 2px solid #4a7dc4;
        }
        
        .notebook-btn.travel:hover {
          background: linear-gradient(135deg, #3d6bb1, #2c5aa0);
        }
        
        .notebook-btn.timeline {
          background: linear-gradient(135deg, #6b3fa0, #4a2c6f);
          color: white;
          border: 2px solid #8b5fc4;
        }
        
        .notebook-btn.timeline:hover {
          background: linear-gradient(135deg, #7c50b1, #6b3fa0);
        }
        
        .notebook-btn.evidence {
          background: linear-gradient(135deg, #a06b3f, #6f4a2c);
          color: white;
          border: 2px solid #c48b5f;
        }
        
        .notebook-btn.evidence:hover {
          background: linear-gradient(135deg, #b17c50, #a06b3f);
        }
        
        .notebook-btn.accuse {
          background: linear-gradient(135deg, #d4a017, #b8860b);
          color: #2a1d0d;
          border: 2px solid #e8b420;
          animation: pulseAccuse 2s ease-in-out infinite;
        }
        
        @keyframes pulseAccuse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212, 160, 23, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(212, 160, 23, 0); }
        }
        
        .notebook-btn.accuse:hover {
          background: linear-gradient(135deg, #e8b420, #d4a017);
        }
      `}</style>
    </div>
  );
}
