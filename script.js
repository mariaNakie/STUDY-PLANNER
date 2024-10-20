document.getElementById('addSubsection').addEventListener('click', function () {
    addSubsectionEntry();
});

function addSubsectionEntry(subsection = '', time = '', day = 'Monday', link = '') {
    const subsectionContainer = document.getElementById('subsectionContainer');
    const subsectionEntry = document.createElement('div');
    subsectionEntry.classList.add('subsection-entry');

    subsectionEntry.innerHTML = `
        <input type="text" class="subsection" value="${subsection}" placeholder="Enter Subsection" required>
        <input type="number" class="time" value="${time}" placeholder="Hours" min="1" max="24" required>
        <select class="day">
            <option value="Monday" ${day === 'Monday' ? 'selected' : ''}>Monday</option>
            <option value="Tuesday" ${day === 'Tuesday' ? 'selected' : ''}>Tuesday</option>
            <option value="Wednesday" ${day === 'Wednesday' ? 'selected' : ''}>Wednesday</option>
            <option value="Thursday" ${day === 'Thursday' ? 'selected' : ''}>Thursday</option>
            <option value="Friday" ${day === 'Friday' ? 'selected' : ''}>Friday</option>
            <option value="Saturday" ${day === 'Saturday' ? 'selected' : ''}>Saturday</option>
            <option value="Sunday" ${day === 'Sunday' ? 'selected' : ''}>Sunday</option>
        </select>
        <input type="url" class="link" value="${link}" placeholder="Enter Resource Link (optional)">
        <button class="delete-subsection">Delete</button>
    `;

    subsectionContainer.appendChild(subsectionEntry);

    // Add event listener for deleting this subsection
    subsectionEntry.querySelector('.delete-subsection').addEventListener('click', function () {
        subsectionEntry.remove();
    });
}

document.getElementById('plannerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const generalGoal = document.getElementById('generalGoal').value;
    const topic = document.getElementById('topic').value;
    const bestTime = document.getElementById('bestTime').value;
    const week = document.getElementById('week').value;

    const subsections = document.querySelectorAll('.subsection-entry');
    const subsectionData = Array.from(subsections).map(entry => ({
        name: entry.querySelector('.subsection').value,
        hours: entry.querySelector('.time').value,
        day: entry.querySelector('.day').value,
        link: entry.querySelector('.link').value
    }));

    const topicSection = document.createElement('div');
    topicSection.classList.add('topic-section');

    topicSection.innerHTML = `
        <h3>${week}</h3>
        <p><strong>General Goal:</strong> ${generalGoal}</p>
        <p><strong>Topic:</strong> ${topic}</p>
        <p class="time-allocation"><strong>Best Time:</strong> ${bestTime}</p>
    `;

    subsectionData.forEach(subsection => {
        const subsectionDiv = document.createElement('div');
        subsectionDiv.classList.add('subsection');
        subsectionDiv.innerHTML = `
            <p><strong>Subsection:</strong> ${subsection.name}</p>
            <p><strong>Hours:</strong> ${subsection.hours} hours on ${subsection.day}</p>
            ${subsection.link ? `<p><strong>Resource Link:</strong> <a href="${subsection.link}" target="_blank">${subsection.link}</a></p>` : ''}
            <button class="edit-subsection">Edit</button>
            <button class="delete-subsection">Delete</button>
        `;
        topicSection.appendChild(subsectionDiv);

        // Event listener for editing this subsection
        subsectionDiv.querySelector('.edit-subsection').addEventListener('click', function () {
            // Prefill the form with the existing subsection data for editing
            document.querySelector('.subsection').value = subsection.name;
            document.querySelector('.time').value = subsection.hours;
            document.querySelector('.day').value = subsection.day;
            document.querySelector('.link').value = subsection.link;

            // Remove this subsection from the display
            subsectionDiv.remove();
        });

        // Event listener for deleting this subsection
        subsectionDiv.querySelector('.delete-subsection').addEventListener('click', function () {
            subsectionDiv.remove();
        });
    });

    // Add delete button for the entire topic
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Topic';
    deleteButton.classList.add('delete-topic');
    topicSection.appendChild(deleteButton);

    deleteButton.addEventListener('click', function () {
        topicSection.remove();
    });

    document.getElementById('schedule').appendChild(topicSection);

    const roadmapDiv = document.getElementById('roadmap');
    const roadmapItem = document.createElement('p');
    roadmapItem.textContent = `By the end of ${week}, aim to complete: ${topic} (Goal: ${generalGoal})`;
    
    // Create a delete button for the roadmap entry
    const roadmapDeleteButton = document.createElement('button');
    roadmapDeleteButton.textContent = 'Delete';
    roadmapDeleteButton.classList.add('delete-roadmap');
    roadmapItem.appendChild(roadmapDeleteButton);

    // Event listener for deleting the roadmap entry
    roadmapDeleteButton.addEventListener('click', function () {
        roadmapItem.remove();
    });

    roadmapDiv.appendChild(roadmapItem);

    // Clear the form after submission
    document.getElementById('plannerForm').reset();
    document.getElementById('subsectionContainer').innerHTML = `<h3>Subsections</h3>`;
});

