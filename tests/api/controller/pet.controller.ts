import { URLSearchParams } from 'url';
import { JsonRequest } from '../request';
import { definitions, operations } from '../../../.temp/types'
//import { JsonRequest } from 'http-req-builder';
import { loadAPISpec, validate } from '../validator';
import { Name } from 'ajv';

export class PetController {
    async getById(id: number | string) {
        const body = (
            await new JsonRequest()
                .url(`http://localhost/v2/pet/${id}`)
                .send<operations['getPetById']['responses']['200']['schema']>()
        ).data
        const apiSpec = await loadAPISpec();
        // @ts-ignore
        const schema = apiSpec.paths!['/pet/{petId}']!['get']!['responses']!['200']!['schema']
        //console.log('SCHEMA!!!!!!!', schema)      
        validate(schema, body)
        return body
    }
    async findByStatus(status: string | string[]) {
        return(
            await new JsonRequest()
                .url(`http://localhost/v2/pet/findByStatus`)
                .urlSearchParams(new URLSearchParams({ status }))
                .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).data
        
    }

    async addNew(pet: Omit<definitions['Pet'], 'id'>) {
            return(
                await new JsonRequest()
                    .url(`http://localhost/v2/pet/`)
                    .method('POST')
                    .body(pet)
                    //.send<operations['addPet']['responses']['200']['schema']>()
                    .send<operations['getPetById']['responses']['200']['schema']>()
            ).data
        }
   
    async update(pet: definitions['Pet']) {
        return(
            await new JsonRequest()
                .url(`http://localhost/v2/pet/`)
                .method('PUT')
                .body(pet)
                //.send<operations['updatePet']['responses']['200']['schema']>()
                .send<operations['getPetById']['responses']['200']['schema']>()
        ).data
    }


    
    async delete(id: number | string) {
        return(
            await new JsonRequest()
                .url(`http://localhost/v2/pet/${id}`)
                .method('DELETE')
                .send<definitions['ApiResponse']>()
            ).data
             }
}