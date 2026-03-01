const fs = require('fs');
const path = require('path');

const universities = [
    {
        name: 'Harvard University',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/512px-Harvard_University_coat_of_arms.svg.png',
        country: 'USA',
        websiteUrl: 'https://www.harvard.edu',
        isActive: true,
        _id: 'uni_1',
        createdAt: new Date().toISOString()
    },
    {
        name: 'Stanford University',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/512px-Stanford_Cardinal_logo.svg.png',
        country: 'USA',
        websiteUrl: 'https://www.stanford.edu',
        isActive: true,
        _id: 'uni_2',
        createdAt: new Date().toISOString()
    },
    {
        name: 'University of Oxford',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-University-Circlet.svg/512px-Oxford-University-Circlet.svg.png',
        country: 'UK',
        websiteUrl: 'https://www.ox.ac.uk',
        isActive: true,
        _id: 'uni_3',
        createdAt: new Date().toISOString()
    },
    {
        name: 'University of Cambridge',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Coat_of_Arms_of_the_University_of_Cambridge.svg/512px-Coat_of_Arms_of_the_University_of_Cambridge.svg.png',
        country: 'UK',
        websiteUrl: 'https://www.cam.ac.uk',
        isActive: true,
        _id: 'uni_4',
        createdAt: new Date().toISOString()
    }
];

const dataPath = path.join(__dirname, 'data', 'universities.json');
fs.writeFileSync(dataPath, JSON.stringify(universities, null, 2));
console.log('Universities seeded successfully!');
