const sessionId = getSessionId();
const playerId = getPlayerId();
let selectedItem = [];
let randomCheck = false;
let clearCheck = true;
let allWords = [];
let gameWords = [];

const categories = ['daysInWeek','months','animals','family',
                    'foods','occupations','elecMach','places',
                    'transportation','sports','musicalInstru']

const wordInCategories = {
    daysInWeek : ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    months : ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
    transportation : ['airport', 'ambulance', 'battery', 'bicycle', 'boat', 'bus', 'car', 'car wash', 
                        'carriage', 'engine', 'excavator', 'fire engine', 'freight car', 'helicopter', 'jeep',
                        'limousine', 'lorry', 'metro', 'minibus', 'motocross', 'motorbike', 'oil tanker', 'petrol', 'pushcart', 
                        'racing car', 'rickshaw', 'sedan', 'steamroller', 'subway', 'tank', 'taxi', 'trailer', 'train', 'tram', 
                        'tricycle', 'truck', 'van'],
    foods : ['egg', 'vegetable', 'fruit', 'grain', 'chicken', 'beef', 'pork', 'cereal', 'rice', 'fish', 'noodle', 'pizza', 'spaghetti', 
                        'sandwich', 'sushi', 'tempura', 'ramen', 'soup', 'meatball', 'hamburger'],
    family : ['father', 'mother', 'sister', 'brother', 'sibling', 'aunt', 'grandfather', 'grandmother', 'Husband', 'wife', 'niece', 'nephew', 
                'uncle', 'daughter', 'son', 'cousin', 'twin', 'granddaughter', 'grandson'],                    
    occupations : ['accountant', 'acrobat', 'actor', 'actress', 'adman', 'agriculturist', 'announcer', 'architect', 'artist', 'astronomer', 
                'athlete', 'auditor', 'author', 'aviator', 'baker', 'banker', 'barber', 'barman', 'bartender', 'biologist', 'bookseller', 'butcher', 'carpenter', 
                'cashier', 'chef', 'chemist', 'dancer', 'designer', 'detective', 'diplomat', 'doctor', 'driver', 'editor', 'electrician', 'engineer', 'farmer', 
                'firefighter', 'fisherman', 'gardener', 'goldsmith', 'guide', 'hairdresser', 'hostess', 'interpreter', 'janitor', 'journalist', 'judge', 
                'lapidary', 'lawyer', 'magician', 'maid', 'masonry', 'mechanic', 'merchant', 'model', 'musician', 'navigator', 'nurse', 'oculist', 'officer',
                'painter', 'pharmacist', 'pilot', 'plumber', 'policeman', 'politician', 'postman', 'priest', 'programmer', 'sailor', 'salesman', 'scientist', 'sculptor', 
                'secretary', 'servant', 'shoemaker', 'singer', 'soldier', 'student', 'stylist', 'tailor', 'teacher', 'veterinarian', 
                'waiter', 'waitress', 'watcher', 'writer'],
    sports : ['archery', 'badminton', 'baseball', 'basketball', 'bowling', 'boxing', 'climbing', 'cycling', 'diving', 'fencing', 'football', 'golf.gymnastics', 
        'handball', 'high jump', 'hockey', 'horse racing', 'ice skating', 'judo', 'karate', 'kendo', 'long jump', 'rugby', 'running', 'sailing', 
        'shooting', 'skiing', 'snooker', 'squash', 'swimming', 'table tennis', 'tennis', 'volleyball', 'water polo', 'weightlifting', 'wrestling'],
    elecMach: ['air conditioner', 'battery', 'blender', 'bulb', 'CD-ROM', 'circuitry', 'clock', 'computer', 'fan', 
                            'grinder', 'heater', 'lamp', 'loudspeaker', 'microphone', 'microwave', 'photocopy', 'plug', 'printer', 'projector', 'pump', 
                            'radio', 'record', 'refrigerator', 'remote control', 'scanner', 'speaker', 'telephone', 'television', 'Thermos', 'toaster', 
                            'video recorder', 'washing machine'],
    musicalInstru : ['accordion', 'acoustic guitar', 'bagpipe', 'bass', 'bass drum', 'bassoon', 'brass', 'bugle', 'castanets', 'cello', 
                        'clarinet', 'cymbal', 'drum', 'fiddle', 'flute', 'french horn', 'gong', 'guitar', 'harmonica', 'harp', 'kettledrum', 'mandolin',
                        'maraca', 'oboe', 'organ', 'percussion', 'piano', 'piccolo', 'pipe organ', 'saxophone', 'tambourine', 'timpani', 'triangle', 'trumpet', 'tuba', 
                        'viola', 'violin', 'xylophone', 'zither'],
    animals : ['bird', 'cat', 'chick', 'cock', 'dog', 'duck', 'goat', 'goldfish', 'goose', 'hamster', 'hedgehog', 'hen', 
                'kitten', 'pig', 'piggy', 'puppy', 'rabbit', 'sheep', 'squirrel', 'turtle', 'cow', 'lion', 'tiger', 'snake', 
                'armadillo', 'baboon', 'badger', 'bear', 'beaver', 'bison', 'boar', 'bull', 'camel', 'cheetah', 'chipmunk', 'deer', 
                'elephant', 'fox', 'gazelle', 'gibbon', 'giraffe', 'gorilla', 'hare', 'hippopotamus', 'hyena', 'impala', 'jaguar', 
                'kangaroo', 'koala', 'leopard', 'llama', 'moose', 'orangutan', 'panda', 'panther', 'platypus', 'polar bear', 'porcupine', 
                'raccoon', 'rhinoceros', 'skunk', 'tapir', 'wildebeest', 'wolf', 'zebra', 'carp', 'clam', 'cockle', 'cod', 'crab', 
                'cuttlefish', 'dolphin', 'eel', 'flounder', 'herring', 'limpet', 'lobster', 'mackerel', 'mussel', 'octopus', 'otter', 
                'oyster', 'prawn', 'salmon', 'scallop', 'seal', 'shrimp', 'snail', 'squid', 'swordfish', 'trout', 'tuna', 'alligator', 
                'bullfrog', 'centipede', 'chameleon', 'cobra', 'crocodile', 'earthworm', 'frog', 'gecko', 'king cobra', 'lizard',
                'newt', 'python', 'rattlesnake', 'salamander', 'skink', 'toad', 'tortoise'],
    places : ['airport', 'bakery', 'bank', 'barbershop', 'beach', 'bus station', 'cafeteria', 'capital', 'car park', 'church', 'cinema', 'city', 'coffee shop', 
                'college', 'continent', 'delicatessen', 'district', 'factory', 'filling station', 'grocery', 'harbour', 'hospital', 'hotel', 'lake', 'library', 
                'market', 'mosque', 'museum', 'nightclub', 'office', 'police station', 'post office', 'province', 'restaurant', 'school', 'sea', 
                'slum', 'supermarket', 'swimming pool', 'television station', 'temple', 'theatre', 'travel agency', 'university', 'village', 'zoo']
};


function selected(id) {
    if (randomCheck === false) {
        const element = document.getElementById(id);
        element.classList.toggle("press");
        if (!selectedItem.includes(id)) { // not in selectedItem
            selectedItem.push(id);
        } else { // in selectedItem
            selectedItem = selectedItem.filter(v => v !== id); 
        }
    } else {
        randomCheck = false;
        clearAllGreen();
        selected(id);
    }
    clearCheck = false
}

function random() {
    clearAllGreen();
    randomCheck = false;
    while (selectedItem.length<3) {
        let i = Math.floor(Math.random()*11);
        var addedItem = categories[i];
        if (!selectedItem.includes(addedItem)) {
            selected(addedItem);
        }
    }
    randomCheck = true;
    clearCheck = false;
}

function clearAllGreen() {
    for(let i = 0; i < selectedItem.length; i++){
        var element = document.getElementById(selectedItem[i]);
        element.classList.toggle("press");
    }
    selectedItem = [];
}

function clear() {
    if (clearCheck==false) {
        clearAllGreen();
        clearCheck = true;
    }
}

async function start() {
    if (selectedItem.length == 0) {
        random();
    }
    for (let e of selectedItem) {
        allWords.push(...wordInCategories[e]);
    }
    while (gameWords.length < 10) {
        let i = Math.floor(Math.random()*allWords.length);
        let addedWords = allWords[i];
        if(!gameWords.includes(addedWords)) {
            gameWords.push(addedWords);
        }
    }
    const validatePromises = gameWords.map(validateWord);
    await Promise.all(validatePromises);
    await submitWords();
}

async function validateWord(inputWord) {
    const word = inputWord;
    const res = await fetch(`https://comp-eng-ess-final-project.herokuapp.com/validate_word`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            word,
        })
    });
    if (res.ok) {
        console.log(`Word added: ${word}`);
    }
    else {
        console.warn(`Word validation failed: ${word}`);
        throw new Error(`Word validation failed: ${word}`);
    }
}

function submitWords() {
    const sessionRef = getSessionRef(sessionId);
    sessionRef.child('words').set(gameWords).then(() => {
        sessionRef.child('phase').set(2).then(() => {
            window.location = 'game-waiting.html';
        });
    });
}

document.querySelector("#random").addEventListener('click',()=>random());
document.querySelector("#clear").addEventListener('click',()=>clear());
document.querySelector("#start").addEventListener('click',()=>start());
