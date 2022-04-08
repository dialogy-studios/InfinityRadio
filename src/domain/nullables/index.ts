export function pickOrDefault<PropType>(prop: PropType | null | undefined, defaultValue: PropType): PropType {
    return prop != null ? prop : defaultValue
}
