const searchToObj = (search: string) => {
    const _search = search.substring(1);
    return JSON.parse(
        '{"' +
            decodeURI(_search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
            '"}'
    );
};

export default searchToObj;
