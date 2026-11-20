import { describe, expect, it } from 'vitest'
import { createCourseSchema, paginationCourseSchema, updateCourseSchema } from './course.schema.js';
import de from 'zod/v4/locales/de.cjs';

describe("validation des cours",()=>{
    it("accepte un cours valide", ()=>{
        const input = {
            title: 'titres',
            description: 'hdnfdsnifndin'
        }
        const result = createCourseSchema.safeParse(input);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(input)
        }
    })
    it('refuse un cours sans titre', () => {
    const input = {
        description: 'hdnfdsnifndin'
    }
    const result = createCourseSchema.safeParse(input)

    expect(result.success).toBe(false)
    })
    it('refuse un cours avec un titire vide', () => {
    const input = {
        title:"",
        description: 'hdnfdsnifndin'
    }
    const result = createCourseSchema.safeParse(input)

    expect(result.success).toBe(false)
    })
    it('refuse un cours avec un titire de plus de 255 caracteres', () => {
    const input = {
        title:'a'.repeat(256),
        description: 'hdnfdsnifndin'
    }
    const result = createCourseSchema.safeParse(input)

    expect(result.success).toBe(false)
    })
    it('refuse une description de plus de 10000 caractères ', () => {
    const input = {
        title:"titre",
        description: 'a'.repeat(10001)
    }
    const result = createCourseSchema.safeParse(input)

    expect(result.success).toBe(false)
    })
    it("accepte un cours avec une description absente", ()=>{
        const input = {
            title: 'titres'        }
        const result = createCourseSchema.safeParse(input);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(input)
        }
    })
    it("accepte une description null", ()=>{
        const input = {
            title: 'titres' ,
            description: null       }
        const result = createCourseSchema.safeParse(input);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(input)
        }
    })
    it("modification avec seulement title acceptée", ()=>{
        const input = {
            title: 'titres' 
                }
        const result = updateCourseSchema.safeParse(input);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(input)
        }
    })
    it("modification avec seulement description acceptée", ()=>{
        const input = {
            description: 'titres' 
                }
        const result = updateCourseSchema.safeParse(input);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(input)
        }
    })
    it("modification avec un objet vide refusé", ()=>{
        const input = {}
        const result = updateCourseSchema.safeParse(input);

        expect(result.success).toBe(false);
        
    })
    it("modification avec un titre invalide refusée", ()=>{
        const input = {
            title: ''
        }
        const result = updateCourseSchema.safeParse(input);

        expect(result.success).toBe(false);
    })
    it("modification avec une description invalide refusée", ()=>{
        const input = {
            description: 'a'.repeat(10001)
        }
        const result = updateCourseSchema.safeParse(input);

        expect(result.success).toBe(false);
    })

     

})
describe ("validation Pagination",()=>{
    it("les valeurs par defaut sont bien envoyé si aucune donnée de pagination n'est envoyé",()=>{
        const input = {}
        const result = paginationCourseSchema.safeParse({});
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual({page:1,limit:10})
        }
    })
    
})
