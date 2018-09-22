cmake_minimum_required(VERSION 3.10)
project(new_property_registry VERSION 1.0.0)

list(APPEND CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/CMakeModules")

set( CMAKE_CXX_STANDARD 14 )
set( CMAKE_CXX_EXTENSIONS ON )
set( CXX_STANDARD_REQUIRED ON)

set( CLI_CLIENT_EXECUTABLE_NAME cleos )
set( GUI_CLIENT_EXECUTABLE_NAME eosio )

set(CMAKE_EXPORT_COMPILE_COMMANDS "ON")

include(wasm)

#cmake_minimum_required(VERSION 3.10)
#project(test_example VERSION 1.0.0)
#
#if(EOSIO_CDT_ROOT STREQUAL "" OR NOT EOSIO_CDT_ROOT)
#    set(EOSIO_CDT_ROOT "/usr/local/eosio.cdt")
#endif()
#list(APPEND CMAKE_MODULE_PATH ${EOSIO_CDT_ROOT}/lib/cmake)
#include(EosioWasmToolchain)

add_subdirectory(contracts)
