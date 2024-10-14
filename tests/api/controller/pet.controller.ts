import { URLSearchParams } from 'url';
import { JsonRequest } from '../request';
import { definitions} from '../../../.temp/types';
import { operations } from '../../../.temp/types';
import { validate } from '../validator'

export class PetController {
    async getById(id: number | string) {
        const body = (
            await new JsonRequest()
                .url(`http://localhost/v2/pet/${id}`)
                .send<operations['getPetById']['responses']['200']['schema']>()
        ).data
        const schema = {
            "$id": "http://example.com/example.json",
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "category": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "name": {
                            "type": "string"
                        }
                    }
                },
                "name": {
                    "type": "string"
                },
                "photoUrls": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "tags": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "integer"
                            },
                            "name": {
                                "type": "string"
                            }
                        }
                    }
                },
                "status": {
                    "type": "string"
                }
            }
        }
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


