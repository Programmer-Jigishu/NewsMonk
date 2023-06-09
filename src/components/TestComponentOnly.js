import React from 'react'


function TestComponentOnly(props) {
    const ref = useRef(null);



    return (
        <div>
        <LoadingBar color='#f11946' ref={ref} />
        <News2 key="query"  reference={ref} searchQuery={navbarSearch} />
        </div>
    )
}

TestComponentOnly.propTypes = {}

export default TestComponentOnly
