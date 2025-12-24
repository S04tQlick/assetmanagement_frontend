import pluralize from 'pluralize';

export const GenerateSlug = (input: string): string => {
    const base = input
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-') ;

    return pluralize(base);
};