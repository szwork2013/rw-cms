db.createUser({
  "user": "accountAdmin01",
  "pwd": "cleartext password",
  "customData": {
    employeeId: 12345
  },
  "roles": [{
      role: "clusterAdmin",
      db: "admin"
    }, {
      role: "readAnyDatabase",
      db: "admin"
    },
    "readWrite"
  ]
}, {
  w: "majority",
  wtimeout: 5000
})
db.createUser({
  'user': 'tiantianquan',
  'pwd': 'caonima1234',
  'roles':[{
      role: "clusterAdmin",
      db: "admin"
    }, {
      role: "readAnyDatabase",
      db: "admin"
    },
    "readWrite"
  ]
})
