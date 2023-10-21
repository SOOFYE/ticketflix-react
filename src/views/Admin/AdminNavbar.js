import React from 'react'

import "../../assets/adminnav.css"

function AdminNavbar() {
  return (
    <div className="admin-selection">
        <div className="admin-tabs"><button>Add New Movie</button></div>
        <div className="admin-tabs"><button>Edit Movie</button></div>
    </div>
  )
}

export default AdminNavbar