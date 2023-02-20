export default function classNames(...args) {
    return args
        .filter(item => item && item)
        .join(" ");
}