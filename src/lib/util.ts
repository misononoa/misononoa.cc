export const chunk = <T>(array: T[], size: number): T[][] => (
    Array.from(
        { length: Math.ceil(array.length / size) },
        (_, i) => array.slice(i * size, (i + 1) * size)
    )
);

export const range = (begin: number, end: number) => (
    [...Array(end - begin)].map((_, i) => (begin + i))
);
