import { gql } from 'apollo-boost';

const createUser = gql`
mutation createUser($id:String, $name: String, $email: String, $password: String, $role: String){
    createUser(id: $id, name: $name, email: $email, password: $password, role: $role){
        message      
    }
}`

const editUser = gql`{
mutation editUser($id:String, $image:String, $cno:String, $city:String, $country:String, $compant:String, $school:String, $hometown, $gender:String, $about:String, $language:String ){
    editUser(id:$id, image:$image, cno:$cno, city:$city, country:$country, company:$company, school:$school, hometown:$hometown, gender:$gender, about:$about, language:$language ){
        message
    }
}
}`

const createCourse = gql`{
mutation createCourse( $id:String, $cname:String, $cdept:String, $cdedc:String, $croom:String, $ccap:String, $cwait:String, $cterm:String, $fid:String ){
    createCourse(id:$id, cname:$cname, cdept:$cdept, cdesc:$cdesc, croom:$croom, ccap:$ccap, cwait:$cwait, cterm:$cterm, fid:$fid ){
        message
    }
}
}`

export { createUser, editUser, createCourse }