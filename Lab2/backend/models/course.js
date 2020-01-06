const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    info: {
        _id: "String",
        fid: "String",
        cname: "String",
        cdept: "String",
        cdesc: "String",
        croom: "String",
        ccap: "String",
        cwait: "String",
        cterm: "String"
    },
    students: [{
        sid: "String",
        sname: "String",
        simage: "String",
        status: "String"
    }],
    announcement: [{
        aname: "String",
        adesc: "String",
        adate: "String"
    }],
    quiz: [{
        qname: "String",
        q1: "String",
        op11: "String",
        op12: "String",
        op13: "String",
        op14: "String",
        cor1: "String",
        q2: "String",
        op21: "String",
        op22: "String",
        op23: "String",
        op24: "String",
        cor2: "String",
        d1: "String",
        d2: "String"
    }],
    grade: [{
        sid: "String",
        sname: "String",
        typeof: "String",
        typename: "String",
        grade: "String"
    }],
    lecture: [{
        fname: "String",
        fpath: "String"
    }],
    assignment: [{
        asname: "String",
        aspath: "String"
    }],
    submission: [{
        sid: "String",
        sname: "String",
        asname: "String",
        subname: "String",
        subpath: "String"
    }]
})

module.exports = mongoose.model("Course", courseSchema)