import React, { useState } from 'react';
import './Materials.css'; // Import the corresponding CSS file
import { MaterialsData } from '../data/MaterialsData';

const Materials = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedSubSection, setExpandedSubSection] = useState(null);
  const [RemoveConfirmation, setRemoveConfirmation] = useState(null);
  const [ActivateConfirmation, setActivateConfirmation] = useState(null);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
      setExpandedSubSection(null);
    } else {
      setExpandedSubSection(null);
      setExpandedSection(section);
    }
  };

  const toggleSubSection = (subSection) => {
    if (expandedSubSection === subSection) {
      setExpandedSubSection(null);
    } else {
      setExpandedSubSection(subSection);
    }
  };

  const handleLinkClick = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up and triggering collapse
  };

  const showActivateConfirmation = (item) => {
    if (item.Active === 'Online') {
      const confirmActivate = window.confirm(`Are you sure you want to Switch ${item.title} to Offline?`);
      if (confirmActivate) {
          setActivateConfirmation(item);
          handleToggleActive(item);
      }
    } else {
      const confirmActivate = window.confirm(`Are you sure you want to Switch ${item.title} to Online?`);
      if (confirmActivate) {
          setActivateConfirmation(item);
          handleToggleActive(item);
      }
    }
};

  

  const handleToggleActive = (item) => {
    const newData = { ...MaterialsData };

    if (item.Active === 'Online') {
      item.Active = 'Offline';
    } else {
      item.Active = 'Online';
    }

    // Update state or any other data management logic as per your application requirements
  };

  const showRemoveConfirmation = (item) => {
    const confirmRemove = window.confirm(`Are you sure you want to Remove ${item.title}?`);
    if (confirmRemove) {
        setRemoveConfirmation(item);
        handleRemove(item);
    }
};

const handleRemove = (item) => {
  // Create copies of the data to modify (assuming MaterialsData is an object)
  const theoreticalData = { ...MaterialsData.theoretical };
  const practicalData = { ...MaterialsData.practical };

  // Function to filter out the item based on its ID
  const filterById = (section, itemId) => {
    return {
      notes: section.notes.filter((note) => note.id !== itemId),
      classified: section.classified.filter((classified) => classified.id !== itemId),
      pastPapers: section.pastPapers.filter((paper) => paper.id !== itemId),
    };
  };

  // Remove item from theoretical section
  if (theoreticalData.notes.find((note) => note.id === item.id)) {
    theoreticalData.notes = filterById(theoreticalData, item.id).notes;
  }
  if (theoreticalData.classified.find((classified) => classified.id === item.id)) {
    theoreticalData.classified = filterById(theoreticalData, item.id).classified;
  }
  if (theoreticalData.pastPapers.find((paper) => paper.id === item.id)) {
    theoreticalData.pastPapers = filterById(theoreticalData, item.id).pastPapers;
  }

  // Remove item from practical section
  if (practicalData.notes.find((note) => note.id === item.id)) {
    practicalData.notes = filterById(practicalData, item.id).notes;
  }
  if (practicalData.classified.find((classified) => classified.id === item.id)) {
    practicalData.classified = filterById(practicalData, item.id).classified;
  }
  if (practicalData.pastPapers.find((paper) => paper.id === item.id)) {
    practicalData.pastPapers = filterById(practicalData, item.id).pastPapers;
  }

  // Update the state or data source with modified data
  MaterialsData.theoretical = theoreticalData;
  MaterialsData.practical = practicalData;

  // Update state or any other data management logic as per your application requirements
  // Example: if using state, you might update a state variable that triggers a re-render
};

  const renderSubSections = (data, sectionName) => {
    return (
      <ul>
        <li onClick={(event) => { toggleSubSection('notes'); event.stopPropagation(); }}>
          Notes
        </li>
        {expandedSubSection === 'notes' && (
          <ul>
            {data.notes.map((item, index) => (
              item.Active === sectionName && (
                <li key={index}>
                  <div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick} // Stop propagation on link click
                    >
                      {item.title}
                    </a>
                  </div>
                  <div className='Butt'>
                    <button onClick={() => showActivateConfirmation(item)}>
                      {item.Active === 'Online' ? 'Switch to Offline' : 'Switch to Online'}
                    </button>
                    <button className='suspend-button' onClick={() => showRemoveConfirmation(item)}>Remove</button>
                  </div>
                </li>
              )
            ))}
          </ul>
        )}
        <li onClick={(event) => { toggleSubSection('classified'); event.stopPropagation(); }}>
          Classified
        </li>
        {expandedSubSection === 'classified' && (
          <ul>
            {data.notes.map((item, index) => (
              item.Active === sectionName && (
                <li key={index}>
                  <div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick} // Stop propagation on link click
                    >
                      {item.title}
                    </a>
                  </div>
                  <div className='Butt'>
                    <button onClick={() => showActivateConfirmation(item)}>
                      {item.Active === 'Online' ? 'Switch to Offline' : 'Switch to Online'}
                    </button>
                    <button className='suspend-button' onClick={() => showRemoveConfirmation(item)}>Remove</button>
                  </div>
                </li>
              )
            ))}
          </ul>
        )}
        <li onClick={(event) => { toggleSubSection('pastPapers'); event.stopPropagation(); }}>
          Past Papers
        </li>
        {expandedSubSection === 'pastPapers' && (
          <ul>
            {data.notes.map((item, index) => (
              item.Active === sectionName && (
                <li key={index}>
                  <div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick} // Stop propagation on link click
                    >
                      {item.title}
                    </a>
                  </div>
                  <div className='Butt'>
                    <button onClick={() => showActivateConfirmation(item)}>
                      {item.Active === 'Online' ? 'Switch to Offline' : 'Switch to Online'}
                    </button>
                    <button className='suspend-button' onClick={() => showRemoveConfirmation(item)}>Remove</button>
                  </div>
                </li>
              )
            ))}
          </ul>
        )}
      </ul>
    );
  };

  return (
    <div>
      <div className="materials-container">
        <h1>Course Materials</h1>

        {/* Theoretical Section */}
        <div
          className={`materials-section ${expandedSection === 'theoretical' ? 'expanded' : ''}`}
          onClick={() => toggleSection('theoretical')}
        >
          <div className="section-header">
            <h2>Theoretical</h2>
          </div>
          {expandedSection === 'theoretical' && renderSubSections(MaterialsData.theoretical, 'Online')}
        </div>

        {/* Practical Section */}
        <div
          className={`materials-section ${expandedSection === 'practical' ? 'expanded' : ''}`}
          onClick={() => toggleSection('practical')}
        >
          <div className="section-header">
            <h2>Practical</h2>
          </div>
          {expandedSection === 'practical' && renderSubSections(MaterialsData.practical, 'Online')}
        </div>
      </div>

      <br />
      <br />

      <div className="materials-container">
        <h1>Offline Course Materials</h1>

        {/* Theoretical Section */}
        <div
          className={`materials-section ${expandedSection === 'offlineTheoretical' ? 'expanded' : ''}`}
          onClick={() => toggleSection('offlineTheoretical')}
        >
          <div className="section-header">
            <h2>Theoretical</h2>
          </div>
          {expandedSection === 'offlineTheoretical' && renderSubSections(MaterialsData.theoretical, 'Offline')}
        </div>

        {/* Practical Section */}
        <div
          className={`materials-section ${expandedSection === 'offlinePractical' ? 'expanded' : ''}`}
          onClick={() => toggleSection('offlinePractical')}
        >
          <div className="section-header">
            <h2>Practical</h2>
          </div>
          {expandedSection === 'offlinePractical' && renderSubSections(MaterialsData.practical, 'Offline')}
        </div>
      </div>
    </div>
  );
};

export default Materials;
