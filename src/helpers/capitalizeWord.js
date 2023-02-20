export default function capitalizeWord(word) {
    return word.split('').map((char, index) => index === 0 ? char.toUpperCase() : char.toLowerCase()).join('');
}