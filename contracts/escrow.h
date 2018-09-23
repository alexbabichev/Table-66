#pragma once

#include <eosiolib/eosio.hpp>
#include <string>

using eosio::contract;
using eosio::multi_index;
using eosio::indexed_by;
using eosio::key256;
using std::string;

class escrow : public contract {

    static eosio::key256 get_key256(const checksum256& value) {
        std::array<uint8_t, 32> words{};
        std::copy(std::begin(value.hash), std::end(value.hash), std::begin(words));
        key256 new_key(words);
        return new_key;
    }

    struct [[eosio::table]] hashdata {
        uint64_t id;
        checksum256 hash;

        uint64_t primary_key() const { return id; }
        key256 by_hash() const { return get_key256(hash); }
        EOSLIB_SERIALIZE(hashdata, (id)(hash))
    };

    struct [[eosio::table]] users {
        uint64_t id;
        account_name user;

        uint64_t primary_key() const { return id; }
        account_name by_user() const { return user; }

        EOSLIB_SERIALIZE(users, (id)(user))
    };

    typedef indexed_by<N(by_hash), eosio::const_mem_fun<hashdata, key256, &hashdata::by_hash>> indexed_by_hash;

    typedef multi_index<
            N(pendinghash),
            hashdata,
            indexed_by_hash
    > pending_hashdata_t;

    typedef multi_index<
            N(hashdata),
            hashdata,
            indexed_by_hash
    > hashdata_t;

    typedef multi_index<
            N(users),
            users,
            indexed_by<N(by_user), eosio::const_mem_fun<users, account_name, &users::by_user>>
    > users_t;

public:
    using contract::contract;

    [[eosio::action]]
    void add(const checksum256 &);

    [[eosio::action]]
    void approve(account_name, const checksum256 &);

    [[eosio::action]]
    void adduser(account_name user);

    [[eosio::action]]
    void removeuser(account_name user);

private:

    bool exist_user(account_name) const;

    bool exist_pending_hash(const checksum256 &) const;

    bool exist_hash(const checksum256 &) const;

};

EOSIO_ABI(escrow, (add)(approve)(adduser)(removeuser))

