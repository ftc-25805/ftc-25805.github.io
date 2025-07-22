import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface GameElement {
  id: string;
  name: string;
  type: 'scoring' | 'field' | 'robot' | 'special';
  description: string;
  image?: string;
  points?: {
    autonomous?: number;
    teleoperated?: number;
    endgame?: number;
  };
  rules: string[];
  strategies: string[];
  dimensions?: {
    length?: string;
    width?: string;
    height?: string;
    weight?: string;
  };
  materials?: string[];
  interactions?: string[];
}

export interface GameElementDemoProps {
  elements: GameElement[];
  season: string;
  gameName: string;
  layout?: 'grid' | 'detailed' | 'interactive';
  showFilters?: boolean;
  interactive?: boolean;
  title?: string;
  subtitle?: string;
}

export default function GameElementDemo({
  elements,
  season,
  gameName,
  layout = 'grid',
  showFilters = true,
  interactive = true,
  title = 'Game Elements Guide',
  subtitle = 'Interactive demonstration of game pieces, field elements, and scoring opportunities'
}: GameElementDemoProps) {
  const [selectedType, setSelectedType] = React.useState<string>('all');
  const [selectedElement, setSelectedElement] = React.useState<string | null>(null);
  const [showDetails, setShowDetails] = React.useState<boolean>(false);

  const types = ['all', 'scoring', 'field', 'robot', 'special'];

  const filteredElements = elements.filter(element => {
    return selectedType === 'all' || element.type === selectedType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'scoring': return '🎯';
      case 'field': return '🏟️';
      case 'robot': return '🤖';
      case 'special': return '⭐';
      default: return '🎮';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'scoring': return 'var(--game-scoring)';
      case 'field': return 'var(--game-field)';
      case 'robot': return 'var(--game-robot)';
      case 'special': return 'var(--game-special)';
      default: return 'var(--ifm-color-primary)';
    }
  };

  const getTotalPoints = (element: GameElement) => {
    if (!element.points) return 0;
    return (element.points.autonomous || 0) + 
           (element.points.teleoperated || 0) + 
           (element.points.endgame || 0);
  };

  const handleElementClick = (elementId: string) => {
    if (interactive) {
      setSelectedElement(selectedElement === elementId ? null : elementId);
      setShowDetails(true);
    }
  };

  return (
    <div className={styles.gameElementDemo}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <div className={styles.gameInfo}>
          <span className={styles.season}>{season} Season</span>
          <span className={styles.gameName}>{gameName}</span>
        </div>
      </div>

      {showFilters && (
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Element Type:</label>
            <div className={styles.typeFilters}>
              {types.map(type => (
                <button
                  key={type}
                  className={clsx(
                    styles.typeButton,
                    selectedType === type && styles.active
                  )}
                  onClick={() => setSelectedType(type)}
                >
                  <span className={styles.typeIcon}>{getTypeIcon(type)}</span>
                  <span className={styles.typeName}>
                    {type === 'all' ? 'All Elements' : 
                      type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={clsx(styles.elementsContainer, styles[layout])}>
        {filteredElements.map((element) => (
          <div 
            key={element.id} 
            className={clsx(
              styles.elementCard,
              selectedElement === element.id && styles.selected,
              interactive && styles.interactive
            )}
            onClick={() => handleElementClick(element.id)}
          >
            <div className={styles.elementHeader}>
              <div 
                className={styles.typeBadge} 
                style={{ backgroundColor: getTypeColor(element.type) }}
              >
                <span className={styles.typeIcon}>{getTypeIcon(element.type)}</span>
                <span className={styles.typeName}>{element.type}</span>
              </div>
              {element.points && getTotalPoints(element) > 0 && (
                <div className={styles.pointsBadge}>
                  {getTotalPoints(element)} pts
                </div>
              )}
            </div>

            {element.image && (
              <div className={styles.elementImage}>
                <img 
                  src={element.image} 
                  alt={element.name}
                  className={styles.image}
                />
              </div>
            )}

            <div className={styles.elementContent}>
              <h3 className={styles.elementName}>{element.name}</h3>
              <p className={styles.elementDescription}>{element.description}</p>

              {element.points && (
                <div className={styles.pointsBreakdown}>
                  <h4>Scoring Points</h4>
                  <div className={styles.pointsGrid}>
                    {element.points.autonomous && (
                      <div className={styles.pointItem}>
                        <span className={styles.pointValue}>{element.points.autonomous}</span>
                        <span className={styles.pointLabel}>Autonomous</span>
                      </div>
                    )}
                    {element.points.teleoperated && (
                      <div className={styles.pointItem}>
                        <span className={styles.pointValue}>{element.points.teleoperated}</span>
                        <span className={styles.pointLabel}>TeleOp</span>
                      </div>
                    )}
                    {element.points.endgame && (
                      <div className={styles.pointItem}>
                        <span className={styles.pointValue}>{element.points.endgame}</span>
                        <span className={styles.pointLabel}>Endgame</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedElement === element.id && showDetails && (
                <div className={styles.elementDetails}>
                  {element.dimensions && (
                    <div className={styles.dimensionsSection}>
                      <h4>Dimensions & Specifications</h4>
                      <div className={styles.dimensionsGrid}>
                        {element.dimensions.length && (
                          <div className={styles.dimensionItem}>
                            <span className={styles.dimLabel}>Length:</span>
                            <span className={styles.dimValue}>{element.dimensions.length}</span>
                          </div>
                        )}
                        {element.dimensions.width && (
                          <div className={styles.dimensionItem}>
                            <span className={styles.dimLabel}>Width:</span>
                            <span className={styles.dimValue}>{element.dimensions.width}</span>
                          </div>
                        )}
                        {element.dimensions.height && (
                          <div className={styles.dimensionItem}>
                            <span className={styles.dimLabel}>Height:</span>
                            <span className={styles.dimValue}>{element.dimensions.height}</span>
                          </div>
                        )}
                        {element.dimensions.weight && (
                          <div className={styles.dimensionItem}>
                            <span className={styles.dimLabel}>Weight:</span>
                            <span className={styles.dimValue}>{element.dimensions.weight}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {element.materials && element.materials.length > 0 && (
                    <div className={styles.materialsSection}>
                      <h4>Materials</h4>
                      <div className={styles.materialsList}>
                        {element.materials.map((material, index) => (
                          <span key={index} className={styles.materialTag}>
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {element.rules && element.rules.length > 0 && (
                    <div className={styles.rulesSection}>
                      <h4>Game Rules</h4>
                      <ul className={styles.rulesList}>
                        {element.rules.map((rule, index) => (
                          <li key={index} className={styles.ruleItem}>{rule}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {element.strategies && element.strategies.length > 0 && (
                    <div className={styles.strategiesSection}>
                      <h4>Team Strategies</h4>
                      <ul className={styles.strategiesList}>
                        {element.strategies.map((strategy, index) => (
                          <li key={index} className={styles.strategyItem}>{strategy}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {element.interactions && element.interactions.length > 0 && (
                    <div className={styles.interactionsSection}>
                      <h4>Element Interactions</h4>
                      <div className={styles.interactionsList}>
                        {element.interactions.map((interaction, index) => (
                          <span key={index} className={styles.interactionTag}>
                            {interaction}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {interactive && (
              <div className={styles.elementFooter}>
                <button className={styles.detailsButton}>
                  {selectedElement === element.id ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredElements.length === 0 && (
        <div className={styles.noResults}>
          <p>No game elements found matching the selected filters.</p>
        </div>
      )}
    </div>
  );
}