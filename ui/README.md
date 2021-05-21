# React Redux Notes


If mapStateToProps argument is specified, the new component will suscribe to Redux store updates.  This means that any time the store is updated, mapStateToProps will be called.  The results of mapStateToProps must be a plain object, which will be merged into the components props

mapDispatchToProps every action creator wrapped into a dispatch call so they may be invoked directly, will be merged merged into component's props