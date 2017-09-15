const ideas = [
    "You could have had it all",
    "You can lead a horse to water, but you can't make him drink",
    "You hit the nail on the head",
    "Show me the money",
    "You can't handle the truth "
];

module.exports.onGet = (request, response) => {
    let index = Math.floor((Math.random() * ideas.length));
    response.json({ idea: ideas[index] });
}

module.exports.onGetAll = (request, response) => {
    response.json({ ideas });
}
