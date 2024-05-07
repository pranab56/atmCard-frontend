export default function layout({children}){
    return (
        <div className='d-flex height gap-1'>
        <div className='w-25  border'>
          <h3 className="text-center">Dashboard</h3>
          <button className="w-100 sidebarbtn">users</button>

          
        </div>
        <div className='w-75 border'>
              {children}
        </div>
      </div>
    )
}