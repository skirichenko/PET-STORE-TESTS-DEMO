import axios from 'axios';
import { URLSearchParams } from 'url';
import { JsonRequest } from '../request';

export class PetController {
    async getById(id: number | string) {
        return(
            await new JsonRequest()
                .url(`http://localhost/v2/pet/${id}`)
                .send()
        ).data
    }

    async findByStatus(status: string | string[]) {
        return(
            await new JsonRequest()
                .url(`http://localhost/v2/pet/findByStatus`)
                .urlSearchParams(new URLSearchParams({ status }))
                .send()
        ).data
        
    }

    async addNew(pet: {
            category: {
                id: number,              
                name: string,
            },
            name: string,
            photoUrls: string[],
            tags: {
                id: number,
                name: string,
              }[],
            status: string,
        }) {
            return(
                await new JsonRequest()
                    .url(`http://localhost/v2/pet/`)
                    .method('POST')
                    .body(pet)
                    .send()
            ).data
        }
   
    async update(pet: {
        id: number,
        category: {
            id: number,              
            name: string,
        },
        name: string,
        photoUrls: string[],
        tags: {
            id: number,
            name: string,
          }[],
        status: string,
    }) {
        return(
            await new JsonRequest()
                .url(`http://localhost/v2/pet/`)
                .method('PUT')
                .body(pet)
                .send()
        ).data
    }


    
    async delete(id: number | string) {
        return(
            await new JsonRequest()
                .url(`http://localhost/v2/pet/${id}`)
                .method('DELETE')
                .send()
            ).data
             }
}


