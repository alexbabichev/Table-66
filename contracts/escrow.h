#pragma once

#include <eosiolib/eosio.hpp>
#include <string>

using eosio::contract;
using eosio::multi_index;
using eosio::indexed_by;
using eosio::key256;
using std::string;

/**
 * Smart contract which enables storing document hashes (Merkle roots)
 * The document hash can be added by some arbitrary account,
 * then it needs to be approved by a trusted third party.
 *
 * Trusted third parties can be added and removed by the contract creator.
 */
class escrow : public contract {

    /**
     * Calculates secondary key value for a document hash
     */
    static eosio::key256 get_key256(const checksum256& value) {
        std::array<uint8_t, 32> words{};
        std::copy(std::begin(value.hash), std::end(value.hash), std::begin(words));
        key256 new_key(words);
        return new_key;
    }

    /**
     * Data structure, representing document hash data
     */
    struct [[eosio::table]] hashdata {
        uint64_t id;
        checksum256 hash;

        /// get primary key
        uint64_t primary_key() const {
            return id;
        }

        /// calculate secondary key
        key256 by_hash() const {
            return get_key256(hash);
        }
        EOSLIB_SERIALIZE(hashdata, (id)(hash))
    };

    /**
     * Data structure, representing a trusted authority system user
     */
    struct [[eosio::table]] users {
        uint64_t id;
        account_name user;

        /// get primary key
        uint64_t primary_key() const {
            return id;
        }

        /// get secondary key
        account_name by_user() const {
            return user;
        }

        EOSLIB_SERIALIZE(users, (id)(user))
    };

    /**
     * Multi Index table for storing document hash index
     */
    typedef indexed_by<N(by_hash), eosio::const_mem_fun<hashdata, key256, &hashdata::by_hash>> indexed_by_hash;

    /**
     * Multi Index table for storing pending documents
     * (which are not yet approved by a trusted authority)
     */
    typedef multi_index<N(pendinghash), hashdata, indexed_by_hash> pending_hashdata_t;

    /**
     * Multi Index table for storing approved documents
     * (which are already approved by a trusted authority)
     */
    typedef multi_index<N(hashdata), hashdata, indexed_by_hash> hashdata_t;

    /**
     * Multi Index table for storing trusted authorities
     * (system users which are allowed to move hashes from pending to approved state)
     */
    typedef multi_index<N(users), users, indexed_by<N(by_user), eosio::const_mem_fun<users, account_name, &users::by_user>>> users_t;

/// Public API functions
public:
    using contract::contract;

    /// add new document hash into the system
    [[eosio::action]]
    void add(const checksum256 &);

    /// approve document represented by its hash
    [[eosio::action]]
    void approve(account_name, const checksum256 &);

    /// add new trusted authority into the system
    [[eosio::action]]
    void adduser(account_name user);

    /// remove existing trusted authority from the system
    [[eosio::action]]
    void removeuser(account_name user);

/// Internal auxiliary functions
private:
    /// check if account specified represents a trusted authority
    bool exist_user(account_name) const;

    /// check if the document hash exists in the system as pending (not approved)
    bool exist_pending_hash(const checksum256 &) const;

    /// check if the document hash exists in the system in approved state
    bool exist_hash(const checksum256 &) const;

};

EOSIO_ABI(escrow, (add)(approve)(adduser)(removeuser))

