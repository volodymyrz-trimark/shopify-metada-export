export const definitionMapper = (data) => {
    return {
        definition: {
            ...data,
            type: data.type.name,
            constraints: data.constraints?.key === null
                ? null
                : { key: data.constraints.key, value: data.constraints.value.node.map(val => val.value), },
        }
    };
};
