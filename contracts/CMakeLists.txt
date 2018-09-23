add_wast_executable(TARGET escrow
        INCLUDE_FOLDERS "${STANDARD_INCLUDE_FOLDERS}"
        LIBRARIES libc libc++ eosiolib
        DESTINATION_FOLDER ${CMAKE_CURRENT_BINARY_DIR}
        )


#add_executable( registry.wasm registry.cpp )
#add_executable( test.wasm test.cpp )
