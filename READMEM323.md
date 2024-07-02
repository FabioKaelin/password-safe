# Modul 323

## Nutzung von Functional programming in diesem Projekt

## High Order Functions

Die Nutzung von High order Functions in diesem Projekt ist sehr fortgeschritten. Beispielsweise wird in der Datei: `CategoriesTable.tsx` ein useEFfect gebraucht, welches einen Filter anwendet. Dieser Filter ist eine High Order Function.

Zeile 29 - 31:
Dabei wird ein Filter angwendet.

```typescript
    useEffect(() => {
        const categoryFilter = (searchInput: string) => (entry: Category) => entry.name.toLowerCase().includes(searchInput.toLowerCase());
        const res = filteredEntries !== null && filteredEntries.filter(categoryFilter(searchInput));
        setFilteredCategories(res);
    }, [searchInput, filteredEntries]);
```

Die Definition des Filter befindet sich in der Datei: `FilteringHandler.ts` und sieht wie folgt aus:
Davon werden mehrere Filter verwendet in verschiedenen Dateien, wie zum Beispiel auch in: `PasswordTable.tsx` und `CategoriesTable.tsx`

```typescript
export const categoryFilter = (searchInput: string) => (entry: Category) => entry.name.toLowerCase().includes(searchInput.toLowerCase());
```

## Immutable values (kind of)

### Immutable values - Beispiel 1

In diesem Projekt wurden auch immutable values verwendet. Beispielsweise in der Datei: `PasswordTable.tsx` wird ein neues Array erstellt, welches die alten Werte beinhaltet und dann wird ein neuer Wert hinzugefügt.

Dabei wird ein neues Array erstellt und ein neuer Wert hinzugefügt.

```typescript
    const newEntries = [...filteredEntries, newEntry];
    setFilteredEntries(newEntries);
```

Weiter wird es wie folgt bearbeitet:

```typescript
    useEffect(() => {
        if (searchInput === " " || searchInput === "" || searchInput === null) {
            setFilteredEntries(entries)
            return
        }
        // Higher Function method
        const res = filteredEntries.filter(vaultFilter(searchInput));
        
        setFilteredEntries(res)
    }, [searchInput]);
```

### Immutable values - Beispiel 2

Ein weiteres Beispiel für die Verwendung von immutable values ist in der Datei: `Sorthandler.tsx` zu finden. Dabei wird ein neues Array erstellt (eine Kopie) und die Werte sortiert.

```typescript
export function sortVaultEntries({sort, toBeSorted, setSort, setFilteredEntries, filteredEntries}: SortHandlerProps) {
    const key = toBeSorted as keyof VaultEntry
    const isASC = sort[toBeSorted]

    const sortedEntries = [...filteredEntries].sort((a, b) => {
        return a[key] > b[key] ? (isASC ? 1 : -1)
            : a[key] < b[key] ? (isASC ? -1 : 1)
                : 0;
    })

    setFilteredEntries(sortedEntries)
    setSort({...sort, [toBeSorted]: !isASC})
}
```
