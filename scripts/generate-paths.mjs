import { writeFileSync } from 'fs'

async function main() {
    const queryCategorie = encodeURIComponent(`*[_type == "categoria"]{ "categoria": slug.current }`)
    const queryProgetti = encodeURIComponent(`*[_type == "progettoVideo"]{ "slug": slug.current }`)

    const [resCat, resProg] = await Promise.all([
        fetch(`https://lbt74p0a.api.sanity.io/v2024-03-09/data/query/production?query=${queryCategorie}`),
        fetch(`https://lbt74p0a.api.sanity.io/v2024-03-09/data/query/production?query=${queryProgetti}`)
    ])

    const catData = await resCat.json()
    const progData = await resProg.json()

    writeFileSync('./scripts/static-paths.json', JSON.stringify({
        categorie: catData.result || [],
        progetti: progData.result || []
    }, null, 2))

    console.log(`Generated paths for ${catData.result?.length} categorie and ${progData.result?.length} progetti`)
}

main().catch(console.error)
