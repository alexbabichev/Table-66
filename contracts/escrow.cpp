#include "escrow.h"

void escrow::add(const checksum256 &hash) {
    pending_hashdata_t pending_hashdata(_self, _self);
    eosio_assert(!this->exist_hash(hash) && !this->exist_pending_hash(hash), "Document already exists");
    auto id = pending_hashdata.available_primary_key();
    pending_hashdata.emplace(_self, [&](auto &document) {
        document.id = id;
        document.hash = hash;
    });
    eosio::print_f("Document added. Id: %, Hash: %", id, get_key256(hash));
}

void escrow::approve(account_name sender, const checksum256 &hash) {
    require_auth(sender);
    users_t allowed_users(_self, _self);
    eosio_assert(this->exist_user(sender), "User does not allowed for this action");
    eosio_assert(!this->exist_hash(hash), "Document already approved");
    pending_hashdata_t pending_hashdata(_self, _self);
    hashdata_t approved_hashdata(_self, _self);
    auto idx = pending_hashdata.template get_index<N(by_hash)>();
    auto found = idx.find(get_key256(hash));
    eosio_assert(found != idx.end(), "Document does not exist");
    auto id = approved_hashdata.available_primary_key();
    approved_hashdata.emplace(_self, [&](auto &document) {
        document.id = id;
        document.hash = found->hash;
    });
    idx.erase(found);
    eosio::print_f("Document approved by %", eosio::name{ sender });
}

void escrow::adduser(account_name user) {
    require_auth(_self);
    users_t allowed_users(_self, _self);
    eosio_assert(!this->exist_user(user), "User already exists");
    auto id = allowed_users.available_primary_key();
    allowed_users.emplace(_self, [&](auto &u) {
        u.id = id;
        u.user = user;
    });
    eosio::print_f("User added %", eosio::name{ user });
}

void escrow::removeuser(account_name user) {
    require_auth(_self);
    users_t allowed_users(_self, _self);
    auto idx = allowed_users.template get_index<N(by_user)>();
    auto found = idx.find(user);
    eosio_assert(found != idx.end(), "User does not exist");
    idx.erase(found);
    eosio::print_f("User removed %", eosio::name{ user });
}

bool escrow::exist_user(account_name user) const {
    users_t allowed_users(_self, _self);
    auto idx = allowed_users.template get_index<N(by_user)>();
    auto found = idx.find(user);
    return found != idx.end();
}

bool escrow::exist_pending_hash(const checksum256 &hash) const {
    pending_hashdata_t pending_hashdata(_self, _self);
    auto idx = pending_hashdata.template get_index<N(by_hash)>();
    auto found = idx.find(get_key256(hash));
    return found != idx.end();
}

bool escrow::exist_hash(const checksum256 &hash) const {
    hashdata_t approved_hashdata(_self, _self);
    auto idx = approved_hashdata.template get_index<N(by_hash)>();
    auto found = idx.find(get_key256(hash));
    return found != idx.end();
}
