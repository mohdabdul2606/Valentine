// Valentine Love Compatibility App - JavaScript

// DOM Elements
const loveForm = document.getElementById('loveForm');
const inputSection = document.getElementById('inputSection');
const resultsSection = document.getElementById('resultsSection');
const darkModeToggle = document.getElementById('darkModeToggle');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const fullscreenPopup = document.getElementById('fullscreenPopup');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    loadSavedData();
    setupEventListeners();
});

// Create Floating Hearts Background
function createFloatingHearts() {
    const heartsBg = document.getElementById('heartsBg');
    const hearts = ['💘', '💗', '💝', '❤️‍🔥', '❤️‍🩹', '😘', '🫶', '💞', '💖', '💓'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.animationDuration = (6 + Math.random() * 4) + 's';
        heart.style.fontSize = (15 + Math.random() * 20) + 'px';
        heartsBg.appendChild(heart);
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Form Submission
    loveForm.addEventListener('submit', handleFormSubmit);
    
    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Music Toggle
    musicToggle.addEventListener('click', toggleMusic);
    
    // Popup Close - tap anywhere to close
    document.getElementById('popupContent').addEventListener('click', () => {
        fullscreenPopup.classList.remove('show');
    });
    
    fullscreenPopup.addEventListener('click', (e) => {
        if (e.target === fullscreenPopup) {
            fullscreenPopup.classList.remove('show');
        }
    });
    
    // Add Memory Button
    document.getElementById('addMemoryBtn')?.addEventListener('click', addCustomMemory);
    
    // Memory Date Changes
    document.querySelectorAll('.memory-date').forEach(input => {
        input.addEventListener('change', saveMemoryDate);
        input.addEventListener('change', updateDateDisplay);
    });
    
    // Initial load of date displays
    updateAllDateDisplays();
    
    // Lock Message
    document.getElementById('lockMessage')?.addEventListener('click', lockMessage);
    
    // Fight Detection
    document.getElementById('detectFight')?.addEventListener('click', detectFightProbability);
    
    // Range Sliders
    document.getElementById('timeTogether')?.addEventListener('input', (e) => {
        document.getElementById('timeValue').textContent = e.target.value + ' hrs';
    });
    
    document.getElementById('interestMatch')?.addEventListener('input', (e) => {
        document.getElementById('interestValue').textContent = e.target.value + '%';
    });
    
    // Chat
    document.getElementById('sendMessage')?.addEventListener('click', sendChatMessage);
    document.getElementById('chatInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });
    
    // Share Buttons
    document.getElementById('shareWhatsapp')?.addEventListener('click', shareOnWhatsApp);
    document.getElementById('downloadPdf')?.addEventListener('click', downloadPDF);
}

// Form Submission Handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const yourName = document.getElementById('yourName').value.trim();
    const partnerName = document.getElementById('partnerName').value.trim();
    const yourDob = document.getElementById('yourDob').value;
    const partnerDob = document.getElementById('partnerDob').value;
    
    if (!yourName || !partnerName || !yourDob || !partnerDob) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Calculate compatibility
    const compatibility = calculateCompatibility(yourName, partnerName, yourDob, partnerDob);
    
    // Predict memory timeline based on names and DOB
    predictMemoryTimeline(yourName, partnerName, yourDob, partnerDob);
    
    // Display results
    displayResults(compatibility, yourName, partnerName);
    
    // Show fullscreen popup
    showFullscreenPopup(compatibility);
    
    // Save data to localStorage
    saveUserData(yourName, partnerName, yourDob, partnerDob, compatibility);
}

// Calculate Compatibility
function calculateCompatibility(yourName, partnerName, yourDob, partnerDob) {
    // Name Match Algorithm
    const nameScore = calculateNameCompatibility(yourName, partnerName);
    
    // Zodiac Compatibility
    const zodiacScore = calculateZodiacCompatibility(yourDob, partnerDob);
    
    // Random emotional factor
    const emotionalFactor = Math.floor(Math.random() * 20) + 10;
    
    // Calculate final score (weighted average)
    const score = Math.round((nameScore * 0.4) + (zodiacScore * 0.4) + (emotionalFactor * 0.2));
    
    return {
        score: Math.min(score, 100),
        nameScore,
        zodiacScore,
        emotionalFactor
    };
}

// Predict Memory Timeline based on names and DOB
function predictMemoryTimeline(yourName, partnerName, yourDob, partnerDob) {
    // Create a seed from names and DOBs for consistent predictions
    const seedString = (yourName + partnerName + yourDob + partnerDob).toLowerCase();
    let seed = 0;
    for (let i = 0; i < seedString.length; i++) {
        seed += seedString.charCodeAt(i);
    }
    
    // Use seed for consistent random values
    const seededRandom = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
    
    // Get reference dates from DOBs
    const yourBirthDate = new Date(yourDob);
    const partnerBirthDate = new Date(partnerDob);
    const currentYear = 2026;
    
    // First Meet - between 1-12 months ago
    const firstMeetDays = Math.floor(seededRandom() * 365) + 30;
    const firstMeetDate = new Date();
    firstMeetDate.setDate(firstMeetDate.getDate() - firstMeetDays);
    
    // First Chat - 1-30 days after first meet
    const firstChatDays = Math.floor(seededRandom() * 30) + 1;
    const firstChatDate = new Date(firstMeetDate);
    firstChatDate.setDate(firstChatDate.getDate() + firstChatDays);
    
    // First Fight - 30-180 days after first meet
    const firstFightDays = Math.floor(seededRandom() * 150) + 30;
    const firstFightDate = new Date(firstMeetDate);
    firstFightDate.setDate(firstFightDate.getDate() + firstFightDays);
    
    // First Trip - 60-365 days after first meet
    const firstTripDays = Math.floor(seededRandom() * 305) + 60;
    const firstTripDate = new Date(firstMeetDate);
    firstTripDate.setDate(firstTripDate.getDate() + firstTripDays);
    
    // Special Moment - 90-400 days after first meet
    const specialDays = Math.floor(seededRandom() * 310) + 90;
    const specialDate = new Date(firstMeetDate);
    specialDate.setDate(specialDate.getDate() + specialDays);
    
    // Format dates as YYYY-MM-DD for input fields
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    // Update input values
    const memories = {
        firstMeet: formatDate(firstMeetDate),
        firstChat: formatDate(firstChatDate),
        firstFight: formatDate(firstFightDate),
        firstTrip: formatDate(firstTripDate),
        specialMoment: formatDate(specialDate)
    };
    
    // Save to localStorage
    localStorage.setItem('memoryDates', JSON.stringify(memories));
    
    // Update input fields
    Object.keys(memories).forEach(type => {
        const input = document.querySelector(`input[data-type="${type}"]`);
        if (input) {
            input.value = memories[type];
        }
    });
    
    // Update display elements
    updateAllDateDisplays();
    
    return memories;
}

// Name Compatibility Algorithm
function calculateNameCompatibility(name1, name2) {
    const combined = (name1 + name2).toLowerCase().split('').sort().join('');
    let sum = 0;
    
    for (let i = 0; i < combined.length; i++) {
        sum += combined.charCodeAt(i);
    }
    
    return Math.round((sum % 70) + 30); // 30-100 range
}

// Zodiac Compatibility
function calculateZodiacCompatibility(dob1, dob2) {
    const zodiac1 = getZodiacSign(dob1);
    const zodiac2 = getZodiacSign(dob2);
    
    const compatibility = {
        'Aries': { 'Aries': 85, 'Leo': 95, 'Sagittarius': 90, 'Gemini': 70, 'Aquarius': 75 },
        'Taurus': { 'Taurus': 95, 'Virgo': 90, 'Capricorn': 85, 'Cancer': 80, 'Pisces': 75 },
        'Gemini': { 'Gemini': 85, 'Libra': 90, 'Aquarius': 85, 'Aries': 70, 'Leo': 75 },
        'Cancer': { 'Cancer': 90, 'Scorpio': 95, 'Pisces': 90, 'Taurus': 80, 'Virgo': 75 },
        'Leo': { 'Leo': 90, 'Aries': 95, 'Sagittarius': 90, 'Gemini': 75, 'Libra': 70 },
        'Virgo': { 'Virgo': 90, 'Taurus': 90, 'Capricorn': 85, 'Cancer': 75, 'Scorpio': 80 },
        'Libra': { 'Libra': 90, 'Gemini': 90, 'Aquarius': 85, 'Leo': 70, 'Sagittarius': 75 },
        'Scorpio': { 'Scorpio': 95, 'Cancer': 95, 'Pisces': 90, 'Virgo': 80, 'Capricorn': 75 },
        'Sagittarius': { 'Sagittarius': 85, 'Aries': 90, 'Leo': 90, 'Libra': 75, 'Aquarius': 70 },
        'Capricorn': { 'Capricorn': 90, 'Taurus': 85, 'Virgo': 85, 'Scorpio': 75, 'Pisces': 70 },
        'Aquarius': { 'Aquarius': 85, 'Gemini': 85, 'Libra': 85, 'Aries': 75, 'Sagittarius': 70 },
        'Pisces': { 'Pisces': 90, 'Cancer': 90, 'Scorpio': 85, 'Taurus': 75, 'Capricorn': 70 }
    };
    
    if (compatibility[zodiac1] && compatibility[zodiac1][zodiac2]) {
        return compatibility[zodiac1][zodiac2];
    }
    
    return Math.floor(Math.random() * 30) + 60; // 60-90 range
}

// Get Zodiac Sign
function getZodiacSign(dob) {
    const date = new Date(dob);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    return 'Pisces';
}

// Display Results
function displayResults(compatibility, yourName, partnerName) {
    resultsSection.style.display = 'block';
    
    // Animate score
    const score = compatibility.score;
    const meterFill = document.getElementById('meterFill');
    const meterNeedle = document.getElementById('meterNeedle');
    const scoreNumber = document.getElementById('scoreNumber');
    
    // Animate meter
    meterNeedle.style.transform = `rotate(${(score / 100) * 180 - 90}deg)`;
    
    // Animate score number
    let currentScore = 0;
    const scoreInterval = setInterval(() => {
        if (currentScore >= score) {
            clearInterval(scoreInterval);
        } else {
            currentScore++;
            scoreNumber.textContent = currentScore;
        }
    }, 20);
    
    // Result message
    const resultMessage = document.getElementById('resultMessage');
    const romanticEmojis = document.getElementById('romanticEmojis');
    
    if (score >= 90) {
        resultMessage.textContent = 'Made For Each Other 💖';
        romanticEmojis.textContent = '💘 💗 💝 ❤️‍🔥 ✨';
    } else if (score >= 70) {
        resultMessage.textContent = 'Strong Bond 💕';
        romanticEmojis.textContent = '💗 💝 💞 🫶 ❤️';
    } else if (score >= 50) {
        resultMessage.textContent = 'Needs Effort ❤️‍🩹';
        romanticEmojis.textContent = '❤️ 😘 🫶 💌';
    } else {
        resultMessage.textContent = 'Complicated 😅';
        romanticEmojis.textContent = '😅 🤔 💭';
    }
    
    // Romantic message
    const loveMessage = document.getElementById('loveMessage');
    loveMessage.textContent = generateRomanticMessage(yourName, partnerName, score);
    
    // Relationship report
    displayRelationshipReport(score);
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Generate Romantic Message
function generateRomanticMessage(name1, name2, score) {
    const messages = {
        high: [
            `Your hearts beat in emotional harmony, ${name1} and ${name2}. This bond has long-term spark potential ❤️`,
            `The stars align when ${name1} and ${name2} are together. Your love story is written in destiny ✨`,
            ` ${name1} and ${name2}, your connection is rare and precious. Hold onto this magic forever 💕`
        ],
        medium: [
            ` ${name1} and ${name2}, your relationship has a solid foundation. With effort, love will flourish 💪`,
            `The journey of ${name1} and ${name2} together is beautiful. Nurture your bond with care ❤️`,
            `Every relationship has challenges, ${name1} and ${name2}. Your love is worth fighting for 💪`
        ],
        low: [
            ` ${name1} and ${name2}, every connection teaches us something. Maybe you need more time to understand each other 🤔`,
            `Love isn't always easy, ${name1} and ${name2}. Perhaps explore what truly connects your hearts 💭`
        ]
    };
    
    let category;
    if (score >= 70) category = 'high';
    else if (score >= 50) category = 'medium';
    else category = 'low';
    
    return messages[category][Math.floor(Math.random() * messages[category].length)];
}

// Display Relationship Report
function displayRelationshipReport(score) {
    const emotional = Math.round(score * (0.8 + Math.random() * 0.2));
    const trust = Math.round(score * (0.75 + Math.random() * 0.25));
    const communication = Math.round(score * (0.7 + Math.random() * 0.3));
    const longTerm = Math.round(score * (0.85 + Math.random() * 0.15));
    
    // Animate progress bars
    setTimeout(() => {
        document.getElementById('emotionalProgress').style.width = emotional + '%';
        document.getElementById('trustProgress').style.width = trust + '%';
        document.getElementById('communicationProgress').style.width = communication + '%';
        document.getElementById('longTermProgress').style.width = longTerm + '%';
    }, 100);
    
    // Update values with animation
    animateValue('emotionalValue', emotional);
    animateValue('trustValue', trust);
    animateValue('communicationValue', communication);
    animateValue('longTermValue', longTerm);
    
    // Overall status
    const overallStatus = document.getElementById('overallStatus');
    if (score >= 90) overallStatus.textContent = 'Soulmate Connection 🔥';
    else if (score >= 70) overallStatus.textContent = 'Strong Partnership 💪';
    else if (score >= 50) overallStatus.textContent = 'Growing Together 🌱';
    else overallStatus.textContent = 'Needs Understanding 🤝';
}

function animateValue(elementId, targetValue) {
    const element = document.getElementById(elementId);
    let current = 0;
    const duration = 1500;
    const step = targetValue / (duration / 16);
    
    const interval = setInterval(() => {
        current += step;
        if (current >= targetValue) {
            element.textContent = targetValue + '%';
            clearInterval(interval);
        } else {
            element.textContent = Math.round(current) + '%';
        }
    }, 16);
}

// Show Fullscreen Popup
function showFullscreenPopup(compatibility) {
    const score = compatibility.score;
    const popupEmojis = document.getElementById('popupEmojis');
    const popupTitle = document.getElementById('popupTitle');
    const popupScore = document.getElementById('popupScore');
    
    if (score >= 90) {
        popupEmojis.textContent = '💘 💗 💝 ❤️‍🔥 💖';
        popupTitle.textContent = 'Made For Each Other!';
    } else if (score >= 70) {
        popupEmojis.textContent = '💕 💗 💝 💞';
        popupTitle.textContent = 'Strong Bond!';
    } else if (score >= 50) {
        popupEmojis.textContent = '❤️‍🩹 💌 ❤️';
        popupTitle.textContent = 'Needs Effort!';
    } else {
        popupEmojis.textContent = '😅 🤔 💭';
        popupTitle.textContent = 'Complicated!';
    }
    
    popupScore.textContent = score + '%';
    fullscreenPopup.classList.add('show');
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.querySelector('.toggle-icon').textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark);
}

// Music Toggle
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.classList.add('playing');
        musicToggle.querySelector('.music-icon').textContent = '🔊';
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.querySelector('.music-icon').textContent = '🎵';
    }
}

// Save User Data to LocalStorage
function saveUserData(yourName, partnerName, yourDob, partnerDob, compatibility) {
    const data = {
        yourName,
        partnerName,
        yourDob,
        partnerDob,
        compatibility,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('valentineLoveData', JSON.stringify(data));
}

// Load Saved Data
function loadSavedData() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.querySelector('.toggle-icon').textContent = '☀️';
    }
    
    // Load saved love data
    const savedData = localStorage.getItem('valentineLoveData');
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('yourName').value = data.yourName || '';
        document.getElementById('partnerName').value = data.partnerName || '';
        document.getElementById('yourDob').value = data.yourDob || '';
        document.getElementById('partnerDob').value = data.partnerDob || '';
    }
    
    // Load memory dates
    loadMemoryDates();
    
    // Check locked message
    checkLockedMessage();
}

// Memory Timeline Functions
function saveMemoryDate(e) {
    const type = e.target.dataset.type;
    const date = e.target.value;
    
    const memories = JSON.parse(localStorage.getItem('memoryDates') || '{}');
    memories[type] = date;
    localStorage.setItem('memoryDates', JSON.stringify(memories));
}

function updateDateDisplay(e) {
    const type = e.target.dataset.type;
    const date = e.target.value;
    const displayId = type + 'Display';
    const displayElement = document.getElementById(displayId);
    
    if (displayElement) {
        if (date) {
            const [year, month, day] = date.split('-');
            displayElement.textContent = day + '-' + month + '-' + year;
            displayElement.classList.add('set');
        } else {
            displayElement.textContent = 'dd-mm-yyyy';
            displayElement.classList.remove('set');
        }
    }
}

function updateAllDateDisplays() {
    const types = ['firstMeet', 'firstChat', 'firstFight', 'firstTrip', 'specialMoment'];
    
    types.forEach(type => {
        const input = document.querySelector(`input[data-type="${type}"]`);
        if (input) {
            const displayId = type + 'Display';
            const displayElement = document.getElementById(displayId);
            const date = input.value;
            
            if (displayElement) {
                if (date) {
                    const [year, month, day] = date.split('-');
                    displayElement.textContent = day + '-' + month + '-' + year;
                    displayElement.classList.add('set');
                }
            }
        }
    });
}

function loadMemoryDates() {
    const memories = JSON.parse(localStorage.getItem('memoryDates') || '{}');
    
    Object.keys(memories).forEach(type => {
        const input = document.querySelector(`input[data-type="${type}"]`);
        if (input) {
            input.value = memories[type];
        }
    });
}

function addCustomMemory() {
    const title = prompt('Enter memory title:');
    if (!title) return;
    
    const date = prompt('Enter date (YYYY-MM-DD):');
    if (!date) return;
    
    const customMemories = JSON.parse(localStorage.getItem('customMemories') || '[]');
    customMemories.push({ title, date, id: Date.now() });
    localStorage.setItem('customMemories', JSON.stringify(customMemories));
    
    renderCustomMemories();
}

function renderCustomMemories() {
    const container = document.getElementById('customMemories');
    const memories = JSON.parse(localStorage.getItem('customMemories') || '[]');
    
    container.innerHTML = memories.map(memory => `
        <div class="custom-memory">
            <div class="memory-text">
                <strong>${memory.title}</strong>
                <span>${memory.date}</span>
            </div>
            <button class="delete-memory" onclick="deleteMemory(${memory.id})">🗑️</button>
        </div>
    `).join('');
}

function deleteMemory(id) {
    let memories = JSON.parse(localStorage.getItem('customMemories') || '[]');
    memories = memories.filter(m => m.id !== id);
    localStorage.setItem('customMemories', JSON.stringify(memories));
    renderCustomMemories();
}

// Locker Functions
function lockMessage() {
    const message = document.getElementById('secretMessage').value.trim();
    const unlockDate = document.getElementById('unlockDate').value;
    
    if (!message || !unlockDate) {
        alert('Please enter a message and select an unlock date!');
        return;
    }
    
    const lockedData = {
        message,
        unlockDate,
        lockedAt: new Date().toISOString()
    };
    
    localStorage.setItem('lockedMessage', JSON.stringify(lockedData));
    
    document.getElementById('lockerForm').style.display = 'none';
    document.getElementById('lockedMessage').style.display = 'block';
    document.getElementById('lockedDate').textContent = new Date(unlockDate).toLocaleDateString();
    
    startCountdown(unlockDate);
}

function checkLockedMessage() {
    const lockedData = JSON.parse(localStorage.getItem('lockedMessage'));
    
    if (!lockedData) return;
    
    const now = new Date();
    const unlockDate = new Date(lockedData.unlockDate);
    
    if (now >= unlockDate) {
        // Show unlocked message
        document.getElementById('lockerForm').style.display = 'none';
        document.getElementById('unlockedMessage').style.display = 'block';
        document.getElementById('revealedMessage').textContent = lockedData.message;
        animateHeartBurst();
    } else {
        // Show locked message
        document.getElementById('lockerForm').style.display = 'none';
        document.getElementById('lockedMessage').style.display = 'block';
        document.getElementById('lockedDate').textContent = unlockDate.toLocaleDateString();
        startCountdown(lockedData.unlockDate);
    }
}

function startCountdown(unlockDate) {
    const countdown = document.getElementById('countdown');
    
    const updateCountdown = () => {
        const now = new Date();
        const unlock = new Date(unlockDate);
        const diff = unlock - now;
        
        if (diff <= 0) {
            location.reload();
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        countdown.textContent = `${days}d ${hours}h ${minutes}m until reveal`;
    };
    
    updateCountdown();
    setInterval(updateCountdown, 60000);
}

function animateHeartBurst() {
    const hearts = document.querySelectorAll('.heart-burst span');
    hearts.forEach((heart, index) => {
        heart.style.animationDelay = (index * 0.1) + 's';
    });
}

// Fight Probability Detector
function detectFightProbability() {
    const communication = document.getElementById('communicationStyle').value;
    const timeTogether = parseInt(document.getElementById('timeTogether').value);
    const interestMatch = parseInt(document.getElementById('interestMatch').value);
    
    // Calculate fight probability
    let probability = 20; // Base
    
    // Communication style impact
    if (communication === 'aggressive') probability += 30;
    else if (communication === 'avoidant') probability += 15;
    else probability -= 10;
    
    // Time together impact
    if (timeTogether < 10) probability += 10;
    else if (timeTogether > 50) probability += 5;
    else probability -= 5;
    
    // Interest match impact
    if (interestMatch < 30) probability += 20;
    else if (interestMatch < 50) probability += 10;
    else probability -= 10;
    
    probability = Math.min(Math.max(probability, 5), 95);
    
    // Display result
    document.getElementById('detectorForm').style.display = 'none';
    document.getElementById('fightResult').style.display = 'block';
    
    // Animate percentage
    let current = 0;
    const percentage = document.getElementById('fightPercentage');
    const interval = setInterval(() => {
        current += 2;
        if (current >= probability) {
            percentage.textContent = probability + '%';
            clearInterval(interval);
        } else {
            percentage.textContent = current + '%';
        }
    }, 20);
    
    // Generate suggestions
    const apologyMessages = [
        "I'm sorry for hurting you. You mean the world to me 💔",
        "Let's talk about this calmly. I value our relationship more than my ego 💕",
        "I didn't mean to upset you. Can we please discuss this? 🙏",
        "You're more important than being right. I'm sorry ❤️"
    ];
    
    const giftIdeas = [
        "Surprise them with chocolates & a handwritten note 🍫✍️",
        "Plan a cozy movie night with their favorite snacks 🎬🍕",
        "Create a scrapbook of your best memories together 📖💕",
        "Cook their favorite meal and set up a romantic dinner 🧑‍🍳❤️"
    ];
    
    document.getElementById('apologyMessage').textContent = apologyMessages[Math.floor(Math.random() * apologyMessages.length)];
    document.getElementById('giftIdea').textContent = giftIdeas[Math.floor(Math.random() * giftIdeas.length)];
}

// AI Love Advisor Chat
function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateAIResponse(message);
        addChatMessage(response, 'ai');
    }, 1000);
}

function addChatMessage(text, type) {
    const container = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'user' ? 'user-message' : 'ai-message';
    
    if (type === 'ai') {
        messageDiv.innerHTML = `
            <span class="ai-avatar">🤖</span>
            <div class="message-bubble">${text}</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-bubble">${text}</div>
        `;
    }
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function generateAIResponse(message) {
    const responses = {
        trust: "Trust is the foundation of any relationship. Be open, honest, and give your partner the benefit of the doubt. Communication is key to building trust! 💪",
        communication: "Great communication involves both speaking and listening. Try to express your feelings without judgment and truly listen to understand, not just to respond! 💬",
        love: "Love is a choice you make every day. It's not just a feeling - it's actions, patience, and choosing your partner even when it's hard. ❤️",
        long: "Long-term relationships require effort from both sides. Keep the spark alive by continuing to date, showing appreciation, and never taking each other for granted! 💕",
        fight: "Fights are normal in relationships! It's how you resolve conflicts that matters. Always aim to understand each other's perspective and find common ground. 🤝",
        default: "Every relationship is unique! The most important thing is mutual respect, open communication, and a genuine desire to make things work. Trust your journey together! 💘"
    };
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('trust')) return responses.trust;
    if (lowerMessage.includes('communicat')) return responses.communication;
    if (lowerMessage.includes('love')) return responses.love;
    if (lowerMessage.includes('long') || lowerMessage.includes('future')) return responses.long;
    if (lowerMessage.includes('fight') || lowerMessage.includes('conflict')) return responses.fight;
    
    return responses.default;
}

// Share on WhatsApp
function shareOnWhatsApp() {
    const score = document.getElementById('scoreNumber').textContent;
    const message = `💘 My Love Compatibility Score with my partner is ${score}%! Check your love compatibility at Valentine Love App!`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Download PDF (Simple version)
function downloadPDF() {
    const score = document.getElementById('scoreNumber').textContent;
    const message = document.getElementById('loveMessage').textContent;
    
    const reportContent = `
        VALENTINE LOVE COMPATIBILITY REPORT
        ================================
        
        Compatibility Score: ${score}%
        
        Romantic Message:
        ${message}
        
        Report Generated: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'love-compatibility-report.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// Initialize custom memories on load
document.addEventListener('DOMContentLoaded', renderCustomMemories);
