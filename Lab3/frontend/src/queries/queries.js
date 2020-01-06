import { gql } from 'apollo-boost';

const loginQuery =gql`{
    users{
        id
        password
        role
    }
}`

const studentCourses =gql`
    {
        user(id:210){
            image
            cno
            city
            country
            company
            school
            hometown
            gender
            about
            language
            courses{
                id
                cname
                cterm
            }
        }
    }`

const facultyCourses =gql`{
    courses{
        id
        cname
        cterm
        fid {
            id
        }
    }
}`

const user =gql`{
    user{
        id
        image
        cno
        city
        country
        company
        school
        hometown
        gender
        about
        language
    }
}`

export { loginQuery, studentCourses, facultyCourses, user }