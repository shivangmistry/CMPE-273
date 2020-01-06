const graphql = require('graphql')
const User = require('../models/user')
const Course = require('../models/course')

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLID
} = graphql

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
        image: { type: GraphQLString },
        cno: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        company: { type: GraphQLString },
        school: { type: GraphQLString },
        hometown: { type: GraphQLString },
        gender: { type: GraphQLString },
        about: { type: GraphQLString },
        language: { type: GraphQLString },
        courses: {
            type: new GraphQLList(CourseType),
            resolve( parent, args ){
                return Course.find({ _id: parent.courses })
            }
        }
    })
})

const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: { type: GraphQLString },
        cname: { type: GraphQLString },
        cdept: { type: GraphQLString },
        cdesc: { type: GraphQLString },
        croom: { type: GraphQLString },
        ccap: { type: GraphQLString },
        cwait: { type: GraphQLString },
        cterm: { type: GraphQLString },
        fid: {
            type: UserType,
            resolve( parent, args ){
                return User.findById({ _id: parent.fid })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        user: {
            type: UserType,
            args: { id: { type: GraphQLString }},
            resolve( parent, args ){
                return User.findById({ _id: args.id })
            }
        },

        users: {
            type: new GraphQLList( UserType ),
            resolve( parent, args ){
                return User.find({})
            }
        },

        course: {
            type: CourseType,
            args: { id: { type: GraphQLString } },
            resolve( parent, args ){
                return Course.findOne({ _id: args.id })
            }
        },

        courses: {
            type: new GraphQLList( CourseType ),
            resolve( parent, args ){
                return Course.find({})
            }
        },

        facultyCourses: {
            type: new GraphQLList( CourseType ),
            args: { fid: { type: GraphQLID }},
            resolve( parent, args ){
                return Course.find({ fid: args.fid })
            }
        },

        studentCourses: {
            type: new GraphQLList( UserType ),
            args: { sid: { type: GraphQLID }},
            resolve( parent, args ){
                return User.find({ _id: args.sid})
            }
        }

    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                role: { type: GraphQLString }
            },
            resolve( parent, args ){
                let user = new User({
                    _id: args.id,
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    role: args.role,
                    image:"https://photos.gograph.com/thumbs/CSP/CSP992/male-profile-picture-vector-stock_k14386009.jpg"
                })
                return user.save()
            }
        },

        editUser: {
            type: UserType,
            args: {
                id: { type: GraphQLString },
                image: { type: GraphQLString },
                cno: { type: GraphQLString },
                city: { type: GraphQLString },
                country: { type: GraphQLString },
                company: { type: GraphQLString },
                school: { type: GraphQLString },
                hometown: { type: GraphQLString },
                gender: { type: GraphQLString },
                about: { type: GraphQLString },
                language: { type: GraphQLString },
            },
            resolve( parent, args ){
                return User.findByIdAndUpdate({ _id: args.id }, args, { new: true })
            }
        },

        createCourse: {
            type: CourseType,
            args: {
                id: { type: GraphQLString },
                cname: { type: GraphQLString },
                cdept: { type: GraphQLString },
                cdesc: { type: GraphQLString },
                croom: { type: GraphQLString },
                ccap: { type: GraphQLString },
                cwait: { type: GraphQLString },
                cterm: { type: GraphQLString },
                fid: { type: GraphQLID },
            },
            resolve( parent, args ){
                let course = new Course({
                    _id: args.id,
                    fid: args.fid,
                    cname: args.cname,
                    cdept: args.cdept,
                    cdesc: args.cdesc,
                    croom: args.croom,
                    ccap: args.ccap,
                    cwait: args.cwait,
                    cterm: args.cterm,
                })
                return course.save()
            }
        },
         
        enrollCourse: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                cid: { type: GraphQLID },
            },
            resolve( parent, args ){
                return User.findByIdAndUpdate({ _id: args.id}, { $push: { courses: args.cid }})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})


// signup
// mutation {
//     createUser(id: "110", name: "John Doe", email: "john@sjsu.edu", password: "john", role: "faculty") {
//         id
//     }
// }

// login
// {
//     user(id: "110"){
//         password
//     }
// }

// edit user
// mutation{
//     editUser(
//         id: "110",
//         cno: "",
//         city: "San Jose",
//         country: "United States",
//         company: "",
//         school: "",
//         hometown: "",
//         gender: "Male",
//         about: "",
//         language: "",
//     ){
//         id
//         name
//         city
//         country
//         gender
//     }
// }

// create course
// mutation{
//     createCourse(
//         id: "CMPE202",
//         cname: "Software Systems Engineering",
//         cdept: "Computer Engineering",
//         cdesc: "Integrated approach to software design and development including requirements elicitation and analysis, system design and construction through studying multiple facets of software development processes, design methodologies, modeling approaches, and implementation techniques. Prerequisite: Classified graduate standing or instructor consent. Computer Engineering and Software Engineering majors only. Misc/Lab: Lecture 3 hours.",
//         croom: "ENG337",
//         ccap: "20",
//         cwait: "10",
//         cterm: "Spring 2019",
//         fid: "110"
//     ){
//         id
//         cname
//     }
// }

// enroll
// mutation{
//     enrollCourse(id: "210", cid: "CMPE202"){
//         id
//         name
//     }
// }

